import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Lock, Unlock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Tooltip } from '../common/Tooltip';
import { EMOTION_TAGS } from '../../utils/constants';

export const CharacterCard = ({ character, onEdit }) => {
    const { deleteCharacter, updateCharacter } = useApp();

    const emotionColor = EMOTION_TAGS.find(e => e.value === character.defaultEmotion)?.color || 'from-gray-400 to-gray-500';

    const handleDelete = () => {
        if (character.locked) {
            return;
        }
        if (confirm(`Delete ${character.name}?`)) {
            deleteCharacter(character.id);
        }
    };

    const toggleLock = () => {
        updateCharacter(character.id, { locked: !character.locked });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card group"
        >
            {/* Avatar Header */}
            <div className={`h-20 bg-gradient-to-br ${emotionColor} rounded-t-lg flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-4xl font-bold text-white">
                    {character.name.charAt(0).toUpperCase()}
                </div>
                {character.locked && (
                    <div className="absolute top-2 right-2">
                        <Tooltip content="Character locked">
                            <div className="bg-black/30 backdrop-blur-sm p-1.5 rounded-lg">
                                <Lock className="w-4 h-4 text-white" />
                            </div>
                        </Tooltip>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{character.name}</h3>
                <p className="text-sm text-secondary line-clamp-2 mb-3">
                    {character.physicalDescription}
                </p>

                {/* Details */}
                <div className="space-y-1.5 mb-3">
                    {character.clothing && (
                        <div className="text-xs">
                            <span className="text-tertiary">Clothing:</span>{' '}
                            <span className="text-secondary">{character.clothing.substring(0, 40)}{character.clothing.length > 40 ? '...' : ''}</span>
                        </div>
                    )}
                    {character.personality && (
                        <div className="text-xs">
                            <span className="text-tertiary">Personality:</span>{' '}
                            <span className="text-secondary">{character.personality.substring(0, 40)}{character.personality.length > 40 ? '...' : ''}</span>
                        </div>
                    )}
                    <div className="text-xs">
                        <span className="text-tertiary">Default Emotion:</span>{' '}
                        <span className="text-secondary capitalize">{character.defaultEmotion.replace('-', ' ')}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Tooltip content={character.locked ? "Unlock character" : "Lock character"}>
                        <button
                            onClick={toggleLock}
                            className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${character.locked
                                    ? 'bg-accent-500 text-dark-950 hover:bg-accent-600'
                                    : 'bg-dark-200 dark:bg-dark-700 text-primary hover:bg-dark-300 dark:hover:bg-dark-600'
                                }`}
                        >
                            {character.locked ? <Lock className="w-4 h-4 mx-auto" /> : <Unlock className="w-4 h-4 mx-auto" />}
                        </button>
                    </Tooltip>
                    <Tooltip content="Edit character">
                        <button
                            onClick={() => onEdit(character)}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-all"
                        >
                            <Edit2 className="w-4 h-4 mx-auto" />
                        </button>
                    </Tooltip>
                    <Tooltip content={character.locked ? "Unlock to delete" : "Delete character"}>
                        <button
                            onClick={handleDelete}
                            disabled={character.locked}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-dark-300 dark:disabled:bg-dark-700 disabled:cursor-not-allowed text-white text-sm font-medium transition-all disabled:opacity-50"
                        >
                            <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </motion.div>
    );
};
