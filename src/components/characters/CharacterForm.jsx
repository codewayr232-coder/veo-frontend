import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { Toggle } from '../common/Toggle';
import { Button } from '../common/Button';
import { validateCharacter } from '../../utils/validation';
import { EMOTION_TAGS } from '../../utils/constants';

export const CharacterForm = ({ character, onClose }) => {
    const { addCharacter, updateCharacter } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        physicalDescription: '',
        clothing: '',
        personality: '',
        defaultEmotion: 'neutral',
        locked: false,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (character) {
            setFormData(character);
        }
    }, [character]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { isValid, errors: validationErrors } = validateCharacter(formData);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        if (character) {
            updateCharacter(character.id, formData);
        } else {
            addCharacter(formData);
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <Input
                label="Character Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                placeholder="e.g., Sarah Chen"
                required
            />

            {/* Physical Description */}
            <Textarea
                label="Physical Description"
                value={formData.physicalDescription}
                onChange={(e) => handleChange('physicalDescription', e.target.value)}
                error={errors.physicalDescription}
                placeholder="Describe the character's appearance, age, build, facial features, etc."
                rows={4}
                autoResize
                maxLength={1000}
                showCount
                required
            />

            {/* Clothing */}
            <Textarea
                label="Clothing & Style"
                value={formData.clothing}
                onChange={(e) => handleChange('clothing', e.target.value)}
                error={errors.clothing}
                placeholder="What does this character typically wear?"
                rows={3}
                autoResize
                maxLength={500}
                showCount
                helperText="Optional, but helps maintain visual consistency"
            />

            {/* Personality */}
            <Textarea
                label="Personality & Traits"
                value={formData.personality}
                onChange={(e) => handleChange('personality', e.target.value)}
                error={errors.personality}
                placeholder="Key personality traits, mannerisms, speech patterns, etc."
                rows={3}
                autoResize
                maxLength={500}
                showCount
                helperText="Helps guide emotional performance and behavior"
            />

            {/* Default Emotion */}
            <Select
                label="Default Emotion"
                value={formData.defaultEmotion}
                onChange={(e) => handleChange('defaultEmotion', e.target.value)}
                options={EMOTION_TAGS.map(tag => ({ value: tag.value, label: tag.label }))}
                helperText="The character's baseline emotional  state"
            />

            {/* Lock Toggle */}
            <Toggle
                label="Lock Character"
                checked={formData.locked}
                onChange={(checked) => handleChange('locked', checked)}
                helperText="Locked characters cannot be modified or deleted, ensuring consistency across all scenes"
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--color-border))]">
                <Button variant="ghost" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit">
                    {character ? 'Update Character' : 'Create Character'}
                </Button>
            </div>
        </form>
    );
};
