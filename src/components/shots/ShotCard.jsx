import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Clock, MessageSquare } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Tooltip } from '../common/Tooltip';
import { CAMERA_TYPES, EMOTION_TAGS } from '../../utils/constants';

export const ShotCard = ({ shot, sceneId, index, onEdit }) => {
    const { deleteShot } = useApp();

    const cameraType = CAMERA_TYPES.find(c => c.value === shot.cameraType);
    const emotion = EMOTION_TAGS.find(e => e.value === shot.emotionTag);

    // Get dynamic icon component
    const CameraIcon = cameraType ? Icons[cameraType.icon] || Icons.Camera : Icons.Camera;

    const handleDelete = () => {
        if (confirm('Delete this shot?')) {
            deleteShot(sceneId, shot.id);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[rgb(var(--color-bg-primary))] rounded-lg p-3 border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-border-hover))] transition-all group"
        >
            <div className="flex items-start gap-3">
                {/* Shot Number */}
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                    </div>
                </div>

                {/* Shot Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <CameraIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">{cameraType?.label}</span>
                        {emotion && (
                            <span className={`px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r ${emotion.color} text-white`}>
                                {emotion.label}
                            </span>
                        )}
                        <div className="flex items-center gap-1 text-xs text-tertiary ml-auto">
                            <Clock className="w-3 h-3" />
                            <span>{shot.duration}s</span>
                        </div>
                    </div>

                    <p className="text-sm text-secondary line-clamp-2 mb-1">
                        {shot.visualDescription}
                    </p>

                    {/* Speaker and Camera Focus Info */}
                    {(shot.speaker || shot.cameraFocus) && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            {shot.speaker && (
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-xs">
                                    <span className="text-blue-700 dark:text-blue-300 font-medium">
                                        🎤 {shot.speaker}
                                    </span>
                                    {shot.characterEmotion && (
                                        <span className="text-blue-600 dark:text-blue-400">
                                            ({shot.characterEmotion})
                                        </span>
                                    )}
                                </div>
                            )}
                            {shot.cameraFocus && shot.cameraFocus !== shot.speaker && (
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-purple-700 dark:text-purple-300">
                                    📹 Focus: {shot.cameraFocus}
                                </div>
                            )}
                        </div>
                    )}

                    {shot.dialogue && (
                        <div className="flex items-start gap-1.5 mt-2 text-xs">
                            <MessageSquare className="w-3 h-3 text-tertiary mt-0.5 flex-shrink-0" />
                            <p className="text-tertiary italic line-clamp-1">"{shot.dialogue}"</p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip content="Edit shot">
                        <button
                            onClick={() => onEdit(shot)}
                            className="p-1.5 rounded hover:bg-primary-600 hover:text-white transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </Tooltip>
                    <Tooltip content="Delete shot">
                        <button
                            onClick={handleDelete}
                            className="p-1.5 rounded hover:bg-red-600 hover:text-white transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </motion.div>
    );
};
