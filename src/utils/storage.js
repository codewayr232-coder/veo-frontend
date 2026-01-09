import { STORAGE_KEYS } from './constants';

/**
 * Save data to localStorage
 */
export const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error(`Error saving to localStorage (${key}):`, error);
        return false;
    }
};

/**
 * Load data from localStorage
 */
export const loadFromStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error loading from localStorage (${key}):`, error);
        return defaultValue;
    }
};

/**
 * Remove data from localStorage
 */
export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from localStorage (${key}):`, error);
        return false;
    }
};

/**
 * Clear all app data from localStorage
 */
export const clearAllStorage = () => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
};

/**
 * Save a version snapshot
 */
export const saveVersion = (characters, locations, scenes) => {
    const versions = loadFromStorage(STORAGE_KEYS.VERSIONS, []);
    const newVersion = {
        id: `v_${Date.now()}`,
        timestamp: Date.now(),
        characters: JSON.parse(JSON.stringify(characters)),
        locations: JSON.parse(JSON.stringify(locations)),
        scenes: JSON.parse(JSON.stringify(scenes)),
    };

    versions.push(newVersion);

    // Keep only last 50 versions
    if (versions.length > 50) {
        versions.shift();
    }

    saveToStorage(STORAGE_KEYS.VERSIONS, versions);
    return newVersion;
};

/**
 * Load all versions
 */
export const loadVersions = () => {
    return loadFromStorage(STORAGE_KEYS.VERSIONS, []);
};

/**
 * Auto-save current state
 */
export const autoSave = (characters, locations, scenes) => {
    saveToStorage(STORAGE_KEYS.CHARACTERS, characters);
    saveToStorage(STORAGE_KEYS.LOCATIONS, locations);
    saveToStorage(STORAGE_KEYS.SCENES, scenes);

    // Also create a version snapshot
    saveVersion(characters, locations, scenes);
};

/**
 * Load current state with deduplication
 */
export const loadState = () => {
    const rawCharacters = loadFromStorage(STORAGE_KEYS.CHARACTERS, []);
    const rawLocations = loadFromStorage(STORAGE_KEYS.LOCATIONS, []);
    const rawScenes = loadFromStorage(STORAGE_KEYS.SCENES, []);

    // Helper to ensure unique IDs
    const ensureUniqueIds = (items, prefix) => {
        const seenIds = new Set();
        return items.map(item => {
            let id = item.id;
            // If ID is missing or duplicate, generate a new one
            if (!id || seenIds.has(id)) {
                id = `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            }
            seenIds.add(id);
            return { ...item, id };
        });
    };

    return {
        characters: ensureUniqueIds(rawCharacters, 'char'),
        locations: ensureUniqueIds(rawLocations, 'loc'),
        scenes: ensureUniqueIds(rawScenes, 'scene').map(scene => ({
            ...scene,
            shots: ensureUniqueIds(scene.shots || [], 'shot')
        })),
    };
};
