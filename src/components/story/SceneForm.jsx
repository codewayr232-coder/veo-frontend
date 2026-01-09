import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { validateScene } from '../../utils/validation';
import { EMOTIONAL_ARCS } from '../../utils/constants';

export const SceneForm = ({ scene, onClose }) => {
    const { addScene, updateScene, locations } = useApp();
    const [formData, setFormData] = useState({
        title: '',
        purpose: '',
        duration: 30,
        locationId: '',
        emotionalArc: 'steady',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (scene) {
            setFormData(scene);
        } else if (locations.length > 0 && !formData.locationId) {
            setFormData(prev => ({ ...prev, locationId: locations[0].id }));
        }
    }, [scene, locations]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { isValid, errors: validationErrors } = validateScene(formData);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        if (scene) {
            updateScene(scene.id, formData);
        } else {
            addScene(formData);
        }

        onClose();
    };

    if (locations.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-secondary mb-4">You need to create at least one location before adding scenes.</p>
                <Button variant="outline" onClick={onClose}>
                    Close
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <Input
                label="Scene Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                error={errors.title}
                placeholder="e.g., The Confrontation"
                required
            />

            {/* Purpose */}
            <Textarea
                label="Scene Purpose"
                value={formData.purpose}
                onChange={(e) => handleChange('purpose', e.target.value)}
                error={errors.purpose}
                placeholder="What does this scene accomplish? What changes or develops?"
                rows={3}
                autoResize
                maxLength={500}
                showCount
                helperText="The narrative function of this scene"
                required
            />

            <div className="grid grid-cols-2 gap-4">
                {/* Location */}
                <Select
                    label="Location"
                    value={formData.locationId}
                    onChange={(e) => handleChange('locationId', e.target.value)}
                    options={locations.map(loc => ({ value: loc.id, label: loc.name }))}
                    error={errors.locationId}
                    required
                />

                {/* Duration */}
                <Input
                    label="Duration (seconds)"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
                    error={errors.duration}
                    min="1"
                    max="600"
                    required
                />
            </div>

            {/* Emotional Arc */}
            <div>
                <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">
                    Emotional Arc
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {EMOTIONAL_ARCS.map(arc => (
                        <button
                            key={arc.value}
                            type="button"
                            onClick={() => handleChange('emotionalArc', arc.value)}
                            className={`
                p-3 rounded-lg text-left border-2 transition-all
                ${formData.emotionalArc === arc.value
                                    ? 'border-primary-500 bg-primary-500/10'
                                    : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-border-hover))]'
                                }
              `}
                        >
                            <div className="font-medium text-sm">{arc.label}</div>
                            <div className="text-xs text-tertiary mt-0.5">{arc.description}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--color-border))]">
                <Button variant="ghost" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit">
                    {scene ? 'Update Scene' : 'Create Scene'}
                </Button>
            </div>
        </form>
    );
};
