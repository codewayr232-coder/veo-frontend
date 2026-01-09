import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { Toggle } from '../common/Toggle';
import { Button } from '../common/Button';
import { validateLocation } from '../../utils/validation';
import { TIME_OF_DAY } from '../../utils/constants';

export const LocationForm = ({ location, onClose }) => {
    const { addLocation, updateLocation } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        environmentDescription: '',
        timeOfDay: 'afternoon',
        soundscape: '',
        locked: false,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (location) {
            setFormData(location);
        }
    }, [location]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { isValid, errors: validationErrors } = validateLocation(formData);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        if (location) {
            updateLocation(location.id, formData);
        } else {
            addLocation(formData);
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <Input
                label="Location Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                placeholder="e.g., Abandoned Warehouse"
                required
            />

            {/* Environment Description */}
            <Textarea
                label="Environment Description"
                value={formData.environmentDescription}
                onChange={(e) => handleChange('environmentDescription', e.target.value)}
                error={errors.environmentDescription}
                placeholder="Describe the location's layout, atmosphere, key visual elements, architecture, etc."
                rows={4}
                autoResize
                maxLength={1000}
                showCount
                required
            />

            {/* Time of Day */}
            <Select
                label="Time of Day"
                value={formData.timeOfDay}
                onChange={(e) => handleChange('timeOfDay', e.target.value)}
                options={TIME_OF_DAY.map(time => ({
                    value: time.value,
                    label: `${time.label} - ${time.description}`
                }))}
                helperText="Affects lighting, mood, and color grading"
            />

            {/* Soundscape */}
            <Textarea
                label="Soundscape (Optional)"
                value={formData.soundscape}
                onChange={(e) => handleChange('soundscape', e.target.value)}
                error={errors.soundscape}
                placeholder="Ambient sounds: traffic noise, birdsong, industrial hum, etc."
                rows={2}
                autoResize
                maxLength={300}
                showCount
                helperText="Helps set the atmosphere for this location"
            />

            {/* Lock Toggle */}
            <Toggle
                label="Lock Location"
                checked={formData.locked}
                onChange={(checked) => handleChange('locked', checked)}
                helperText="Locked locations maintain consistent appearance across all scenes"
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--color-border))]">
                <Button variant="ghost" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit">
                    {location ? 'Update Location' : 'Create Location'}
                </Button>
            </div>
        </form>
    );
};
