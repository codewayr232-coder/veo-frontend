import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit2, Trash2, MapPin, Clock, TrendingUp, ChevronDown, ChevronRight, Film } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ShotEditor } from '../shots/ShotEditor';
import { Tooltip } from '../common/Tooltip';
import { EMOTIONAL_ARCS } from '../../utils/constants';

export const SceneCard = ({ scene, index, onEdit }) => {
    const { deleteScene, locations } = useApp();
    const [isExpanded, setIsExpanded] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: scene.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const location = locations.find(loc => loc.id === scene.locationId);
    const emotionalArc = EMOTIONAL_ARCS.find(arc => arc.value === scene.emotionalArc);
    const shotCount = Array.isArray(scene.shots) ? scene.shots.length : 0;
    const totalShotDuration = Array.isArray(scene.shots)
        ? scene.shots.reduce((sum, shot) => sum + (shot.duration || 0), 0)
        : 0;

    const handleDelete = () => {
        if (confirm(`Delete scene "${scene.title}"?`)) {
            deleteScene(scene.id);
        }
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card overflow-hidden"
        >
            {/* Scene Header */}
            <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-500/20 dark:to-accent-500/20 p-4">
                <div className="flex items-start gap-3">
                    {/* Drag Handle */}
                    <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing pt-1">
                        <Tooltip content="Drag to reorder">
                            <GripVertical className="w-5 h-5 text-tertiary hover:text-primary transition-colors" />
                        </Tooltip>
                    </div>

                    {/* Scene Number */}
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">
                            {index + 1}
                        </div>
                    </div>

                    {/* Scene Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1">{scene.title}</h3>
                        <p className="text-sm text-secondary line-clamp-2 mb-3">{scene.purpose}</p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                            {location && (
                                <div className="flex items-center gap-1.5 text-tertiary">
                                    < MapPin className="w-4 h-4" />
                                    <span>{location.name}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1.5 text-tertiary">
                                <Clock className="w-4 h-4" />
                                <span>{scene.duration}s</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-tertiary">
                                <TrendingUp className="w-4 h-4" />
                                <span>{emotionalArc?.label}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-tertiary">
                                <Film className="w-4 h-4" />
                                <span>{shotCount} shot{shotCount !== 1 ? 's' : ''} ({totalShotDuration}s)</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Tooltip content="Expand shots">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                            >
                                {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            </button>
                        </Tooltip>
                        <Tooltip content="Edit scene">
                            <button
                                onClick={() => onEdit(scene)}
                                className="p-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </Tooltip>
                        <Tooltip content="Delete scene">
                            <button
                                onClick={handleDelete}
                                className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* Shot Editor (Expandable) */}
            {isExpanded && (
                <div className="border-t border-[rgb(var(--color-border))]">
                    <ShotEditor sceneId={scene.id} />
                </div>
            )}
        </motion.div>
    );
};
