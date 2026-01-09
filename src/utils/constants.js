// Camera types for shot configuration
export const CAMERA_TYPES = [
    { value: 'wide', label: 'Wide Shot', icon: 'Maximize2', description: 'Establishes scene context' },
    { value: 'medium', label: 'Medium Shot', icon: 'Minus', description: 'Character focus with context' },
    { value: 'close', label: 'Close-Up', icon: 'Minimize2', description: 'Intimate character detail' },
    { value: 'extreme-close', label: 'Extreme Close-Up', icon: 'Eye', description: 'Intense detail focus' },
    { value: 'tracking', label: 'Tracking Shot', icon: 'Move', description: 'Following movement' },
    { value: 'dolly', label: 'Dolly Shot', icon: 'ArrowRight', description: 'Moving toward/away' },
    { value: 'crane', label: 'Crane Shot', icon: 'ArrowUp', description: 'Vertical movement' },
    { value: 'pov', label: 'POV Shot', icon: 'User', description: 'Character perspective' },
    { value: 'over-shoulder', label: 'Over-the-Shoulder', icon: 'Users', description: 'Dialogue framing' },
    { value: 'aerial', label: 'Aerial Shot', icon: 'Globe', description: 'Bird\'s eye view' },
    { value: 'slow-motion', label: 'Slow Motion', icon: 'Clock', description: 'Dramatic emphasis' },
];

// Emotion tags for scenes and shots
export const EMOTION_TAGS = [
    { value: 'joy', label: 'Joy', color: 'from-yellow-400 to-orange-400' },
    { value: 'sadness', label: 'Sadness', color: 'from-blue-400 to-indigo-400' },
    { value: 'anger', label: 'Anger', color: 'from-red-500 to-orange-600' },
    { value: 'fear', label: 'Fear', color: 'from-purple-500 to-gray-600' },
    { value: 'surprise', label: 'Surprise', color: 'from-pink-400 to-yellow-400' },
    { value: 'disgust', label: 'Disgust', color: 'from-green-500 to-yellow-600' },
    { value: 'anticipation', label: 'Anticipation', color: 'from-cyan-400 to-blue-500' },
    { value: 'trust', label: 'Trust', color: 'from-green-400 to-teal-400' },
    { value: 'tension', label: 'Tension', color: 'from-red-400 to-purple-500' },
    { value: 'calm', label: 'Calm', color: 'from-blue-300 to-green-300' },
    { value: 'excitement', label: 'Excitement', color: 'from-orange-400 to-pink-500' },
    { value: 'melancholy', label: 'Melancholy', color: 'from-gray-400 to-blue-400' },
    { value: 'neutral', label: 'Neutral', color: 'from-gray-400 to-gray-500' },
];

// Character facial emotions (for dialog delivery)
export const CHARACTER_EMOTIONS = [
    { value: 'joy', label: 'Joy', emoji: '😊', description: 'Happy, smiling' },
    { value: 'sadness', label: 'Sadness', emoji: '😢', description: 'Sad, crying' },
    { value: 'anger', label: 'Anger', emoji: '😠', description: 'Angry, frustrated' },
    { value: 'fear', label: 'Fear', emoji: '😨', description: 'Scared, worried' },
    { value: 'surprise', label: 'Surprise', emoji: '😲', description: 'Shocked, amazed' },
    { value: 'disgust', label: 'Disgust', emoji: '🤢', description: 'Disgusted, repulsed' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', description: 'Calm, expressionless' },
    { value: 'determination', label: 'Determination', emoji: '😤', description: 'Focused, resolute' },
    { value: 'confusion', label: 'Confusion', emoji: '😕', description: 'Confused, uncertain' },
    { value: 'love', label: 'Love', emoji: '🥰', description: 'Loving, affectionate' },
    { value: 'contempt', label: 'Contempt', emoji: '😒', description: 'Dismissive, scornful' },
    { value: 'pride', label: 'Pride', emoji: '😌', description: 'Proud, satisfied' },
];

// Time of day options for locations
export const TIME_OF_DAY = [
    { value: 'dawn', label: 'Dawn', description: 'Early morning, soft light' },
    { value: 'morning', label: 'Morning', description: 'Bright and energetic' },
    { value: 'noon', label: 'Noon', description: 'Peak sunlight, harsh shadows' },
    { value: 'afternoon', label: 'Afternoon', description: 'Warm, golden hour approaching' },
    { value: 'golden-hour', label: 'Golden Hour', description: 'Magical warm light' },
    { value: 'dusk', label: 'Dusk', description: 'Transition to night' },
    { value: 'night', label: 'Night', description: 'Dark, artificial lighting' },
    { value: 'midnight', label: 'Midnight', description: 'Deep night atmosphere' },
];

// Emotional arc options for scenes
export const EMOTIONAL_ARCS = [
    { value: 'rising', label: 'Rising Action', description: 'Building tension and anticipation' },
    { value: 'falling', label: 'Falling Action', description: 'Releasing tension, winding down' },
    { value: 'climax', label: 'Climax', description: 'Peak dramatic moment' },
    { value: 'steady', label: 'Steady', description: 'Consistent emotional tone' },
    { value: 'revelation', label: 'Revelation', description: 'Discovery or realization moment' },
    { value: 'conflict', label: 'Conflict', description: 'Opposing forces colliding' },
    { value: 'resolution', label: 'Resolution', description: 'Conflict resolving' },
];

// Story tone options
export const STORY_TONES = [
    { value: 'dramatic', label: 'Dramatic', description: 'Intense and serious' },
    { value: 'comedic', label: 'Comedic', description: 'Light and humorous' },
    { value: 'suspenseful', label: 'Suspenseful', description: 'Thrilling and mysterious' },
    { value: 'romantic', label: 'Romantic', description: 'Emotional and heartfelt' },
    { value: 'action', label: 'Action', description: 'Fast-paced and exciting' },
    { value: 'horror', label: 'Horror', description: 'Dark and frightening' },
    { value: 'inspirational', label: 'Inspirational', description: 'Uplifting and motivational' },
    { value: 'melancholic', label: 'Melancholic', description: 'Reflective and bittersweet' },
];

// Pacing options
export const PACING_OPTIONS = [
    { value: 'slow', label: 'Slow', description: 'Deliberate, contemplative' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced rhythm' },
    { value: 'fast', label: 'Fast', description: 'Quick cuts, high energy' },
    { value: 'variable', label: 'Variable', description: 'Dynamic pacing changes' },
];

// Default character
export const DEFAULT_CHARACTER = {
    id: '',
    name: '',
    physicalDescription: '',
    clothing: '',
    personality: '',
    defaultEmotion: 'neutral',
    locked: false,
    createdAt: Date.now(),
};

// Default location
export const DEFAULT_LOCATION = {
    id: '',
    name: '',
    environmentDescription: '',
    timeOfDay: 'afternoon',
    soundscape: '',
    locked: false,
    createdAt: Date.now(),
};

// Default scene
export const DEFAULT_SCENE = {
    id: '',
    title: '',
    purpose: '',
    duration: 30,
    locationId: '',
    emotionalArc: 'steady',
    shots: [],
    order: 0,
    createdAt: Date.now(),
};

// Default shot
export const DEFAULT_SHOT = {
    id: '',
    cameraType: 'medium',
    duration: 5,
    visualDescription: '',
    dialogue: '',
    emotionTag: 'neutral',
    speaker: '',
    characterEmotion: 'neutral',
    cameraFocus: '',
    order: 0,
    createdAt: Date.now(),
};

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = [
    { key: 'Cmd+S', description: 'Save current state', action: 'save' },
    { key: 'Cmd+Z', description: 'Undo last change', action: 'undo' },
    { key: 'Cmd+Shift+Z', description: 'Redo change', action: 'redo' },
    { key: 'Cmd+N', description: 'New scene', action: 'newScene' },
    { key: 'Cmd+K', description: 'Generate story', action: 'generateStory' },
    { key: 'Cmd+G', description: 'Generate video', action: 'generateVideo' },
    { key: 'Cmd+H', description: 'Version history', action: 'versionHistory' },
    { key: 'J', description: 'Previous scene', action: 'prevScene' },
    { key: 'K', description: 'Next scene', action: 'nextScene' },
    { key: 'Space', description: 'Play/Pause video', action: 'playPause' },
    { key: 'Cmd+/', description: 'Show shortcuts', action: 'showShortcuts' },
];

// LocalStorage keys
export const STORAGE_KEYS = {
    CHARACTERS: 'veo_characters',
    LOCATIONS: 'veo_locations',
    SCENES: 'veo_scenes',
    VERSIONS: 'veo_versions',
    THEME: 'veo_theme',
    SETTINGS: 'veo_settings',
};

// Video job statuses
export const VIDEO_JOB_STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
};

// Language options for AI-generated dialogue
export const LANGUAGES = [
    { value: 'en', label: 'English', flag: '🇬🇧' },
    { value: 'es', label: 'Spanish', flag: '🇪🇸' },
    { value: 'fr', label: 'French', flag: '🇫🇷' },
    { value: 'de', label: 'German', flag: '🇩🇪' },
    { value: 'it', label: 'Italian', flag: '🇮🇹' },
    { value: 'pt', label: 'Portuguese', flag: '🇵🇹' },
    { value: 'ru', label: 'Russian', flag: '🇷🇺' },
    { value: 'ja', label: 'Japanese', flag: '🇯🇵' },
    { value: 'ko', label: 'Korean', flag: '🇰🇷' },
    { value: 'zh', label: 'Chinese', flag: '🇨🇳' },
    { value: 'ar', label: 'Arabic', flag: '🇸🇦' },
    { value: 'hi', label: 'Hindi', flag: '🇮🇳' },
];

// Story generation styles
export const STORY_STYLES = [
    { value: 'action', label: 'Action', description: 'Fast-paced, exciting sequences' },
    { value: 'drama', label: 'Drama', description: 'Emotional, character-driven' },
    { value: 'comedy', label: 'Comedy', description: 'Light-hearted and humorous' },
    { value: 'thriller', label: 'Thriller', description: 'Suspenseful and mysterious' },
    { value: 'romance', label: 'Romance', description: 'Love and relationships' },
    { value: 'scifi', label: 'Sci-Fi', description: 'Futuristic and technological' },
    { value: 'fantasy', label: 'Fantasy', description: 'Magical and otherworldly' },
    { value: 'horror', label: 'Horror', description: 'Dark and frightening' },
];

// AI Story Generation Settings
export const AI_SCENE_DURATION = 8; // Each scene is 8 seconds as per requirement
