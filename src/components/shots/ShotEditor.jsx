import React, { useState } from 'react';
import { Plus, Film } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ShotCard } from './ShotCard';
import { ShotForm } from './ShotForm';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const ShotEditor = ({ sceneId }) => {
    const { scenes, addShot } = useApp();
    const scene = scenes.find(s => s.id === sceneId);
    const shots = scene?.shots || [];

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingShot, setEditingShot] = useState(null);

    const handleEdit = (shot) => {
        setEditingShot(shot);
        setIsFormOpen(true);
    };

    const handleClose = () => {
        setIsFormOpen(false);
        setEditingShot(null);
    };

    return (
        <div className="bg-[rgb(var(--color-bg-secondary))] p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-tertiary uppercase tracking-wide">
                    Shots ({shots.length})
                </h4>
                <Button
                    size="sm"
                    variant="secondary"
                    icon={Plus}
                    onClick={() => setIsFormOpen(true)}
                >
                    Add Shot
                </Button>
            </div>

            {shots.length === 0 ? (
                <div className="text-center py-8 text-tertiary">
                    <Film className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No shots yet. Add your first shot to this scene.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {shots.map((shot, index) => (
                        <ShotCard
                            key={shot.id}
                            shot={shot}
                            sceneId={sceneId}
                            index={index}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}

            {/* Shot Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleClose}
                title={editingShot ? 'Edit Shot' : 'Add New Shot'}
                size="lg"
            >
                <ShotForm
                    sceneId={sceneId}
                    shot={editingShot}
                    onClose={handleClose}
                />
            </Modal>
        </div>
    );
};
