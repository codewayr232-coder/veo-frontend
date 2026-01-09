import React, { useState } from 'react';
import { Plus, Film, Award, Sparkles } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useApp } from '../../contexts/AppContext';
import { SceneCard } from './SceneCard';
import { SceneForm } from './SceneForm';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { api } from '../../services/api';
import { EnhancementResultModal } from './EnhancementResultModal';

export const StoryCanvas = () => {
    const { scenes, reorderScenes, locations, characters, showToast, updateTokens, user, addCharacter, addLocation, addScene, updateScene } = useApp();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingScene, setEditingScene] = useState(null);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [enhancementScores, setEnhancementScores] = useState(null);
    const [enhancedStoryData, setEnhancedStoryData] = useState(null);
    const [showEnhancementModal, setShowEnhancementModal] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = scenes.findIndex(s => s.id === active.id);
            const newIndex = scenes.findIndex(s => s.id === over.id);

            const newOrder = arrayMove(scenes, oldIndex, newIndex).map((scene, index) => ({
                ...scene,
                order: index,
            }));

            reorderScenes(newOrder);
        }
    };

    const handleEdit = (scene) => {
        setEditingScene(scene);
        setIsFormOpen(true);
    };

    const handleClose = () => {
        setIsFormOpen(false);
        setEditingScene(null);
    };

    const handleEnhance = async () => {
        if (scenes.length === 0) {
            showToast('Add at least one scene before enhancing', 'error');
            return;
        }
        if (user.tokens < 20) {
            showToast('Need 20 tokens for enhancement', 'error');
            return;
        }
        setIsEnhancing(true);
        try {
            const totalDur = scenes.reduce((sum, s) => sum + (s.duration || 0), 0);
            const response = await api.story.enhanceExisting({
                story: { characters, locations, scenes },
                videoLength: totalDur,
                language: 'en',
                style: 'cinematic',
            });

            // Store enhanced story data
            setEnhancedStoryData(response.data.story);
            setEnhancementScores(response.data.enhancement);

            // Show modal instead of auto-applying
            setShowEnhancementModal(true);

            // Tokens already deducted by backend
            // Update local token count from response or refetch
            updateTokens(user.tokens - 20);
        } catch (error) {
            showToast(error.message || 'Enhancement failed', 'error');
        } finally {
            setIsEnhancing(false);
        }
    };

    const handleApplyEnhancement = () => {
        if (!enhancedStoryData) return;

        // Apply enhanced story to canvas
        // Note: This will trigger database updates via context
        showToast('✨ Applying enhanced story...', 'info');

        // Update scenes with enhanced data
        enhancedStoryData.scenes.forEach((enhancedScene, index) => {
            if (scenes[index]) {
                updateScene(scenes[index].id, {
                    ...enhancedScene,
                    id: scenes[index].id, // Keep original ID
                });
            }
        });

        showToast(`✅ Enhanced story applied! Quality Score: ${enhancementScores?.scores?.overall}/100`, 'success');
        setShowEnhancementModal(false);
        setEnhancedStoryData(null);
    };

    const handleDiscardEnhancement = () => {
        showToast('Enhancement discarded', 'info');
        setShowEnhancementModal(false);
        setEnhancedStoryData(null);
        setEnhancementScores(null);
    };

    const totalDuration = scenes.reduce((sum, scene) => sum + (scene.duration || 0), 0);

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))]">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-600 rounded-lg">
                            <Film className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Story Canvas</h1>
                            <p className="text-sm text-secondary">Build your cinematic narrative</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {scenes.length > 0 && (
                            <Button
                                icon={Award}
                                variant="secondary"
                                onClick={handleEnhance}
                                disabled={isEnhancing}
                            >
                                {isEnhancing ? 'Enhancing...' : 'Enhance Story'}
                            </Button>
                        )}
                        <Button icon={Plus} onClick={() => setIsFormOpen(true)}>
                            Add Scene
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm">
                    <div>
                        <span className="text-tertiary">Scenes:</span>{' '}
                        <span className="font-semibold text-primary">{scenes.length}</span>
                    </div>
                    <div>
                        <span className="text-tertiary">Total Duration:</span>{' '}
                        <span className="font-semibold text-primary">
                            {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}
                        </span>
                    </div>
                    {locations.length > 0 && (
                        <div>
                            <span className="text-tertiary">Locations:</span>{' '}
                            <span className="font-semibold text-primary">{locations.length}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Scene Timeline */}
            <div className="flex-1 overflow-y-auto p-6">
                {scenes.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-md">
                            <div className="text-8xl mb-6">🎬</div>
                            <h3 className="text-2xl font-bold text-primary mb-3">Start Your Story</h3>
                            <p className="text-secondary mb-6">
                                Create your first scene to begin crafting your cinematic narrative. Define the location, emotional arc, and shots that bring your vision to life.
                            </p>
                            {locations.length === 0 && (
                                <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                    <p className="text-sm text-yellow-700 dark:text-yellow-500">
                                        💡 Tip: Create at least one location before adding scenes
                                    </p>
                                </div>
                            )}
                            <Button
                                icon={Plus}
                                size="lg"
                                onClick={() => setIsFormOpen(true)}
                                disabled={locations.length === 0}
                            >
                                Create First Scene
                            </Button>
                        </div>
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={scenes.map(s => s.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-4 max-w-5xl mx-auto">
                                {scenes.map((scene, index) => (
                                    <SceneCard
                                        key={scene.id}
                                        scene={scene}
                                        index={index}
                                        onEdit={handleEdit}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>

            {/* Scene Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleClose}
                title={editingScene ? 'Edit Scene' : 'Create New Scene'}
                size="xl"
            >
                <SceneForm
                    scene={editingScene}
                    onClose={handleClose}
                />
            </Modal>

            {/* Enhancement Result Modal */}
            <EnhancementResultModal
                isOpen={showEnhancementModal}
                onClose={handleDiscardEnhancement}
                enhancementScores={enhancementScores}
                onApply={handleApplyEnhancement}
                onDiscard={handleDiscardEnhancement}
            />
        </div>
    );
};
