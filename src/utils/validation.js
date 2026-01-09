/**
 * Validate character data
 */
export const validateCharacter = (character) => {
    const errors = {};

    if (!character.name || character.name.trim().length === 0) {
        errors.name = 'Character name is required';
    } else if (character.name.length < 2) {
        errors.name = 'Character name must be at least 2 characters';
    }

    if (!character.physicalDescription || character.physicalDescription.trim().length === 0) {
        errors.physicalDescription = 'Physical description is required';
    } else if (character.physicalDescription.length < 10) {
        errors.physicalDescription = 'Physical description should be more detailed (min 10 characters)';
    }

    if (character.clothing && character.clothing.length > 500) {
        errors.clothing = 'Clothing description is too long (max 500 characters)';
    }

    if (character.personality && character.personality.length > 500) {
        errors.personality = 'Personality description is too long (max 500 characters)';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Validate location data
 */
export const validateLocation = (location) => {
    const errors = {};

    if (!location.name || location.name.trim().length === 0) {
        errors.name = 'Location name is required';
    } else if (location.name.length < 2) {
        errors.name = 'Location name must be at least 2 characters';
    }

    if (!location.environmentDescription || location.environmentDescription.trim().length === 0) {
        errors.environmentDescription = 'Environment description is required';
    } else if (location.environmentDescription.length < 10) {
        errors.environmentDescription = 'Environment description should be more detailed (min 10 characters)';
    }

    if (location.soundscape && location.soundscape.length > 300) {
        errors.soundscape = 'Soundscape description is too long (max 300 characters)';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Validate scene data
 */
export const validateScene = (scene) => {
    const errors = {};

    if (!scene.title || scene.title.trim().length === 0) {
        errors.title = 'Scene title is required';
    } else if (scene.title.length < 3) {
        errors.title = 'Scene title must be at least 3 characters';
    }

    if (!scene.purpose || scene.purpose.trim().length === 0) {
        errors.purpose = 'Scene purpose is required';
    } else if (scene.purpose.length < 10) {
        errors.purpose = 'Scene purpose should be more detailed (min 10 characters)';
    }

    if (!scene.duration || scene.duration <= 0) {
        errors.duration = 'Scene duration must be greater than 0';
    } else if (scene.duration > 600) {
        errors.duration = 'Scene duration is too long (max 600 seconds)';
    }

    if (!scene.locationId) {
        errors.locationId = 'Please select a location for this scene';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Validate shot data
 */
export const validateShot = (shot) => {
    const errors = {};

    if (!shot.cameraType) {
        errors.cameraType = 'Camera type is required';
    }

    if (!shot.visualDescription || shot.visualDescription.trim().length === 0) {
        errors.visualDescription = 'Visual description is required';
    } else if (shot.visualDescription.length < 10) {
        errors.visualDescription = 'Visual description should be more detailed (min 10 characters)';
    }

    if (!shot.duration || shot.duration <= 0) {
        errors.duration = 'Shot duration must be greater than 0';
    } else if (shot.duration > 60) {
        errors.duration = 'Shot duration is too long (max 60 seconds)';
    }

    if (shot.dialogue && shot.dialogue.length > 500) {
        errors.dialogue = 'Dialogue is too long (max 500 characters)';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Validate story generation input
 */
export const validateStoryInput = (input) => {
    const errors = {};

    if (!input.brief || input.brief.trim().length === 0) {
        errors.brief = 'Story brief is required';
    } else if (input.brief.length < 20) {
        errors.brief = 'Story brief should be more detailed (min 20 characters)';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};
