import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadState, autoSave } from '../utils/storage';
import { api } from '../services/api';
import { DEFAULT_CHARACTER, DEFAULT_LOCATION, DEFAULT_SCENE, DEFAULT_SHOT, STORAGE_KEYS } from '../utils/constants';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // Theme
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('veo_theme');
        return saved || 'dark';
    });

    // Characters
    const [characters, setCharacters] = useState([]);

    // Locations
    const [locations, setLocations] = useState([]);

    // Scenes
    const [scenes, setScenes] = useState([]);

    // Selected items
    const [selectedScene, setSelectedScene] = useState(null);

    // Toast notifications
    const [toasts, setToasts] = useState([]);

    // Modal states
    const [activeModal, setActiveModal] = useState(null);

    // Video generation
    const [videoJob, setVideoJob] = useState({ status: 'idle', progress: 0, videoUrl: null });

    // Auth State
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    // Initial Auth Check
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('auth_user');

        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
                setIsAuthenticated(true);
            } catch (e) {
                console.error('Failed to parse saved user', e);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
            }
        }
        setIsLoadingAuth(false);
    }, []);

    const login = useCallback((token, userData) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        showToast('Successfully logged in', 'success');
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setUser(null);
        setIsAuthenticated(false);
        showToast('Logged out', 'info');
    }, []);

    const updateTokens = useCallback((newBalance) => {
        if (user) {
            const updatedUser = { ...user, tokens: newBalance };
            setUser(updatedUser);
            localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        }
    }, [user]);

    // Project State
    const [currentProject, setCurrentProject] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const loadProject = useCallback(async (id) => {
        try {
            const project = await api.projects.getOne(id);
            setCurrentProject(project);

            // Load project data into state
            if (project.data) {
                setCharacters(project.data.characters || []);
                setLocations(project.data.locations || []);
                setScenes(project.data.scenes || []);
            }
            return project;
        } catch (error) {
            showToast('Failed to load project', 'error');
            throw error;
        }
    }, []);

    const saveProject = useCallback(async (silent = false) => {
        if (!currentProject) return;
        setIsSaving(true);
        try {
            const data = {
                characters,
                locations,
                scenes
            };
            await api.projects.update(currentProject.id, { data });
            if (!silent) showToast('Project saved', 'success');
        } catch (error) {
            console.error('Save error:', error);
            if (!silent) showToast('Failed to save project', 'error');
        } finally {
            setIsSaving(false);
        }
    }, [currentProject, characters, locations, scenes]);

    // Load initial state
    useEffect(() => {
        const state = loadState();
        setCharacters(state.characters);
        setLocations(state.locations);
        setScenes(state.scenes);
    }, []);

    // Auto-save on changes
    // Auto-save on changes (Local Storage + Backend)
    useEffect(() => {
        if (characters.length > 0 || locations.length > 0 || scenes.length > 0) {
            // Local Storage Auto-save (Immediate/Fast)
            const localTimer = setTimeout(() => {
                autoSave(characters, locations, scenes);
            }, 1000);

            // Backend Auto-save (Debounced 2s)
            let backendTimer;
            if (currentProject) {
                backendTimer = setTimeout(async () => {
                    console.log('Auto-saving to backend...');
                    // Pass silent=true to avoid toast spam
                    saveProject(true);
                }, 2000);
            }

            return () => {
                clearTimeout(localTimer);
                if (backendTimer) clearTimeout(backendTimer);
            };
        }
    }, [characters, locations, scenes, currentProject, saveProject]);

    // Theme management
    useEffect(() => {
        localStorage.setItem('veo_theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    // Character management
    const addCharacter = useCallback((character, silent = false) => {
        const uniqueId = `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newChar = { ...DEFAULT_CHARACTER, ...character, id: uniqueId, createdAt: Date.now() };
        setCharacters(prev => [...prev, newChar]);
        if (!silent) showToast('Character created successfully', 'success');
        return newChar;
    }, []);

    const updateCharacter = useCallback((id, updates) => {
        setCharacters(prev => prev.map(char =>
            char.id === id ? { ...char, ...updates } : char
        ));
        showToast('Character updated', 'success');
    }, []);

    const deleteCharacter = useCallback((id) => {
        const char = characters.find(c => c.id === id);
        if (char?.locked) {
            showToast('Cannot delete locked character', 'error');
            return;
        }
        setCharacters(prev => prev.filter(char => char.id !== id));
        showToast('Character deleted', 'success');
    }, [characters]);

    // Location management
    const addLocation = useCallback((location, silent = false) => {
        const uniqueId = `loc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newLoc = { ...DEFAULT_LOCATION, ...location, id: uniqueId, createdAt: Date.now() };
        setLocations(prev => [...prev, newLoc]);
        if (!silent) showToast('Location created successfully', 'success');
        return newLoc;
    }, []);

    const updateLocation = useCallback((id, updates) => {
        setLocations(prev => prev.map(loc =>
            loc.id === id ? { ...loc, ...updates } : loc
        ));
        showToast('Location updated', 'success');
    }, []);

    const deleteLocation = useCallback((id) => {
        const loc = locations.find(l => l.id === id);
        if (loc?.locked) {
            showToast('Cannot delete locked location', 'error');
            return;
        }
        setLocations(prev => prev.filter(loc => loc.id !== id));
        showToast('Location deleted', 'success');
    }, [locations]);

    // Scene management
    const addScene = useCallback((scene, silent = false) => {
        const uniqueId = `scene_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newScene = {
            ...DEFAULT_SCENE,
            ...scene,
            id: uniqueId,
            order: scenes.length,
            createdAt: Date.now()
        };
        setScenes(prev => [...prev, newScene]);
        if (!silent) showToast('Scene created successfully', 'success');
        return newScene;
    }, [scenes.length]);

    const updateScene = useCallback((id, updates) => {
        setScenes(prev => prev.map(scene =>
            scene.id === id ? { ...scene, ...updates } : scene
        ));
    }, []);

    const deleteScene = useCallback((id) => {
        setScenes(prev => prev.filter(scene => scene.id !== id));
        showToast('Scene deleted', 'success');
    }, []);

    const reorderScenes = useCallback((newOrder) => {
        setScenes(newOrder);
    }, []);

    // Shot management
    const addShot = useCallback((sceneId, shot) => {
        setScenes(prev => prev.map(scene => {
            if (scene.id === sceneId) {
                const shots = scene.shots || [];
                const newShot = {
                    ...DEFAULT_SHOT,
                    ...shot,
                    id: `shot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    order: shots.length,
                    createdAt: Date.now()
                };
                return { ...scene, shots: [...shots, newShot] };
            }
            return scene;
        }));
        showToast('Shot added successfully', 'success');
    }, []);

    const updateShot = useCallback((sceneId, shotId, updates) => {
        setScenes(prev => prev.map(scene => {
            if (scene.id === sceneId) {
                return {
                    ...scene,
                    shots: scene.shots.map(shot =>
                        shot.id === shotId ? { ...shot, ...updates } : shot
                    )
                };
            }
            return scene;
        }));
    }, []);

    const deleteShot = useCallback((sceneId, shotId) => {
        setScenes(prev => prev.map(scene => {
            if (scene.id === sceneId) {
                return {
                    ...scene,
                    shots: scene.shots.filter(shot => shot.id !== shotId)
                };
            }
            return scene;
        }));
        showToast('Shot deleted', 'success');
    }, []);

    // Toast notifications
    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, duration }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, duration);
    }, []);

    const value = {
        // Theme
        theme,
        toggleTheme,

        // Characters
        characters,
        addCharacter,
        updateCharacter,
        deleteCharacter,

        // Locations
        locations,
        addLocation,
        updateLocation,
        deleteLocation,

        // Scenes
        scenes,
        addScene,
        updateScene,
        deleteScene,
        reorderScenes,
        selectedScene,
        setSelectedScene,

        // Shots
        addShot,
        updateShot,
        deleteShot,

        // Toasts
        toasts,
        showToast,

        // Modals
        activeModal,
        setActiveModal,

        // Video
        videoJob,
        setVideoJob,

        // Clear All
        clearAllStory: useCallback(async () => {
            try {
                // Clear local state
                setCharacters([]);
                setLocations([]);
                setScenes([]);
                setSelectedScene(null);

                // Clear local storage
                localStorage.removeItem(STORAGE_KEYS.CHARACTERS);
                localStorage.removeItem(STORAGE_KEYS.LOCATIONS);
                localStorage.removeItem(STORAGE_KEYS.SCENES);

                // Sync with backend if in a project
                if (currentProject) {
                    const emptyData = {
                        characters: [],
                        locations: [],
                        scenes: []
                    };
                    await api.projects.update(currentProject.id, { data: emptyData });
                }

                showToast('All story data deleted', 'success');
            } catch (error) {
                console.error('Failed to clear story:', error);
                showToast('Failed to delete data from server', 'error');
            }
        }, [currentProject]),

        // Auth
        user,
        isAuthenticated,
        isLoadingAuth,
        login,
        logout,
        updateTokens,

        // Projects
        currentProject,
        isSaving,
        loadProject,
        saveProject,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
