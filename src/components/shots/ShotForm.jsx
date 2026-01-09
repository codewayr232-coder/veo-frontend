import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { validateShot } from '../../utils/validation';
import { CAMERA_TYPES, EMOTION_TAGS, CHARACTER_EMOTIONS } from '../../utils/constants';

export const ShotForm = ({ sceneId, shot, onClose }) => {
    const { addShot, updateShot, characters } = useApp();
    const [formData, setFormData] = useState({
        cameraType: 'medium',
        duration: 5,
        visualDescription: '',
        dialogue: '',
        emotionTag: 'neutral',
        speaker: '',
        characterEmotion: 'neutral',
        cameraFocus: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (shot) {
            setFormData(shot);
        }
    }, [shot]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { isValid, errors: validationErrors } = validateShot(formData);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        if (shot) {
            updateShot(sceneId, shot.id, formData);
        } else {
            addShot(sceneId, formData);
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Camera Type */}
            <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-3">
                    Camera Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {CAMERA_TYPES.map(camera => {
                        const CameraIcon = Icons[camera.icon] || Icons.Camera;
                        return (
                            <button
                                key={camera.value}
                                type="button"
                                onClick={() => handleChange('cameraType', camera.value)}
                                className={`
                  p-3 rounded-lg text-left border-2 transition-all
                  ${formData.cameraType === camera.value
                                        ? 'border-primary-500 bg-primary-500/10'
                                        : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-border-hover))]'
                                    }
                `}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <CameraIcon className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium">{camera.label}</span>
                                </div>
                                <p className="text-xs text-tertiary">{camera.description}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Visual Description */}
            <Textarea
                label="Visual Description"
                value={formData.visualDescription}
                onChange={(e) => handleChange('visualDescription', e.target.value)}
                error={errors.visualDescription}
                placeholder="Describe what the camera captures in this shot..."
                rows={4}
                autoResize
                maxLength={500}
                showCount
                required
            />

            <div className="grid grid-cols-2 gap-4">
                {/* Duration */}
                <Input
                    label="Duration (seconds)"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
                    error={errors.duration}
                    min="1"
                    max="60"
                    required
                />

                {/* Emotion Tag */}
                <Select
                    label="Emotion Tag"
                    value={formData.emotionTag}
                    onChange={(e) => handleChange('emotionTag', e.target.value)}
                    options={EMOTION_TAGS.map(tag => ({ value: tag.value, label: tag.label }))}
                />
            </div>

            {/* Dialogue (Optional) */}
            <Textarea
                label="Dialogue (Optional)"
                value={formData.dialogue}
                onChange={(e) => handleChange('dialogue', e.target.value)}
                error={errors.dialogue}
                placeholder="Any spoken dialogue in this shot..."
                rows={2}
                autoResize
                maxLength={500}
                showCount
                helperText="Leave empty if no dialogue in this shot"
            />

            {/* Speaker and Emotion (shown when dialogue exists) */}
            {formData.dialogue && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    <Select
                        label="Speaker"
                        value={formData.speaker}
                        onChange={(e) => handleChange('speaker', e.target.value)}
                        options={[
                            { value: '', label: 'Select speaker...' },
                            ...characters.map(char => ({ value: char.name, label: char.name }))
                        ]}
                        helperText="Who is speaking?"
                    />
                    <Select
                        label="Speaker's Emotion"
                        value={formData.characterEmotion}
                        onChange={(e) => handleChange('characterEmotion', e.target.value)}
                        options={CHARACTER_EMOTIONS.map(emotion => ({
                            value: emotion.value,
                            label: `${emotion.emoji} ${emotion.label}`
                        }))}
                        helperText="Facial expression"
                    />
                </div>
            )}

            {/* Camera Focus */}
            <Select
                label="Camera Focus (Optional)"
                value={formData.cameraFocus}
                onChange={(e) => handleChange('cameraFocus', e.target.value)}
                options={[
                    { value: '', label: 'No specific focus' },
                    ...characters.map(char => ({ value: char.name, label: char.name }))
                ]}
                helperText="Which character should the camera focus on?"
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--color-border))]">
                <Button variant="ghost" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit">
                    {shot ? 'Update Shot' : 'Add Shot'}
                </Button>
            </div>
        </form>
    );
};
