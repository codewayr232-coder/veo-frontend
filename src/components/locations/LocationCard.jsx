import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Lock, Unlock, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Tooltip } from '../common/Tooltip';
import { TIME_OF_DAY } from '../../utils/constants';

export const LocationCard = ({ location, onEdit }) => {
    const { deleteLocation, updateLocation } = useApp();

    const timeOfDay = TIME_OF_DAY.find(t => t.value === location.timeOfDay);

    const handleDelete = () => {
        if (location.locked) {
            return;
        }
        if (confirm(`Delete ${location.name}?`)) {
            deleteLocation(location.id);
        }
    };

    const toggleLock = () => {
        updateLocation(location.id, { locked: !location.locked });
    };

    // Time of day color mapping
    const timeColors = {
        dawn: 'from-orange-300 to-pink-300',
        morning: 'from-yellow-200 to-blue-300',
        noon: 'from-yellow-400 to-blue-400',
        afternoon: 'from-orange-300 to-purple-300',
        'golden-hour': 'from-orange-400 to-pink-500',
        dusk: 'from-purple-400 to-indigo-500',
        night: 'from-indigo-600 to-purple-900',
        midnight: 'from-gray-800 to-black',
    };

    const gradient = timeColors[location.timeOfDay] || 'from-gray-400 to-gray-600';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card group"
        >
            {/* Header with time of day gradient */}
            <div className={`h- bg-gradient-to-br ${gradient} rounded-t-lg flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 text-white text-center py-3 px-4">
                    <div className="text-xs font-medium opacity-90 mb-0.5">{timeOfDay?.label || location.timeOfDay}</div>
                    <div className="text-2xl font-bold">{location.name}</div>
                </div>
                {location.locked && (
                    <div className="absolute top-2 right-2">
                        <Tooltip content="Location locked">
                            <div className="bg-black/30 backdrop-blur-sm p-1.5 rounded-lg">
                                <Lock className="w-4 h-4 text-white" />
                            </div>
                        </Tooltip>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="text-sm text-secondary line-clamp-3 mb-3">
                    {location.environmentDescription}
                </p>

                {/* Details */}
                <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-xs">
                        <Clock className="w-3.5 h-3.5 text-tertiary" />
                        <span className="text-tertiary">Time:</span>
                        <span className="text-secondary">{timeOfDay?.description}</span>
                    </div>
                    {location.soundscape && (
                        <div className="text-xs">
                            <span className="text-tertiary">Soundscape:</span>{' '}
                            <span className="text-secondary">{location.soundscape.substring(0, 50)}{location.soundscape.length > 50 ? '...' : ''}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Tooltip content={location.locked ? "Unlock location" : "Lock location"}>
                        <button
                            onClick={toggleLock}
                            className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${location.locked
                                    ? 'bg-accent-500 text-dark-950 hover:bg-accent-600'
                                    : 'bg-dark-200 dark:bg-dark-700 text-primary hover:bg-dark-300 dark:hover:bg-dark-600'
                                }`}
                        >
                            {location.locked ? <Lock className="w-4 h-4 mx-auto" /> : <Unlock className="w-4 h-4 mx-auto" />}
                        </button>
                    </Tooltip>
                    <Tooltip content="Edit location">
                        <button
                            onClick={() => onEdit(location)}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-all"
                        >
                            <Edit2 className="w-4 h-4 mx-auto" />
                        </button>
                    </Tooltip>
                    <Tooltip content={location.locked ? "Unlock to delete" : "Delete location"}>
                        <button
                            onClick={handleDelete}
                            disabled={location.locked}
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
