/**
 * Build scene-by-scene VEO prompts (VEO cannot generate entire video at once)
 * Each scene gets its own detailed prompt with locked character descriptions
 */
export const buildAllSceneVeoPrompts = (characters, locations, scenes) => {
    if (!scenes || scenes.length === 0) {
        return [];
    }

    return scenes.map((scene, index) => buildSceneVeoPrompt(scene, index, characters, locations));
};

/**
 * Build a VEO prompt for a single scene
 */
export const buildSceneVeoPrompt = (scene, sceneIndex, characters, locations) => {
    const location = locations.find(loc => loc.id === scene.locationId);

    // Get all characters appearing in this scene
    const sceneCharacterNames = new Set();
    scene.shots?.forEach(shot => {
        if (shot.characters && Array.isArray(shot.characters)) {
            shot.characters.forEach(charName => sceneCharacterNames.add(charName));
        }
        if (shot.speaker) {
            sceneCharacterNames.add(shot.speaker);
        }
    });

    // Get character objects for this scene (only locked characters + characters in this scene)
    const sceneCharacters = characters.filter(char =>
        sceneCharacterNames.has(char.name) || char.locked
    );

    let prompt = `=== VEO PROMPT FOR SCENE ${sceneIndex + 1}: ${scene.title} ===\n\n`;

    // Scene Overview
    prompt += `**SCENE OVERVIEW:**\n`;
    prompt += `Title: ${scene.title}\n`;
    prompt += `Duration: ${scene.duration} seconds\n`;
    prompt += `Purpose: ${scene.purpose}\n`;
    prompt += `Emotional Arc: ${scene.emotionalArc}\n`;
    if (location) {
        prompt += `Location: ${location.name}\n`;
        prompt += `Time of Day: ${location.timeOfDay}\n`;
    }
    prompt += `\n`;

    // Locked Character Descriptions (for consistency across all scenes)
    if (sceneCharacters.length > 0) {
        prompt += `**CHARACTER DESCRIPTIONS (MAINTAIN CONSISTENCY):**\n\n`;
        sceneCharacters.forEach((char) => {
            prompt += `${char.name}${char.locked ? ' [LOCKED - MUST MAINTAIN EXACT APPEARANCE]' : ''}:\n`;
            prompt += `  - Physical: ${char.physicalDescription}\n`;
            if (char.clothing) prompt += `  - Clothing: ${char.clothing}\n`;
            if (char.personality) prompt += `  - Personality: ${char.personality}\n`;
            prompt += `  - Default Emotion: ${char.defaultEmotion}\n`;
            prompt += `\n`;
        });
    }

    // Location Details
    if (location) {
        prompt += `**LOCATION DETAILS:**\n`;
        prompt += `Name: ${location.name}\n`;
        prompt += `Environment: ${location.environmentDescription}\n`;
        prompt += `Time of Day: ${location.timeOfDay}\n`;
        if (location.soundscape) prompt += `Soundscape: ${location.soundscape}\n`;
        if (location.locked) prompt += `[LOCKED - Location must maintain consistent appearance]\n`;
        prompt += `\n`;
    }

    // Shot-by-Shot Breakdown
    if (scene.shots && scene.shots.length > 0) {
        prompt += `**SHOT-BY-SHOT BREAKDOWN:**\n\n`;

        scene.shots.forEach((shot, shotIndex) => {
            prompt += `Shot ${sceneIndex + 1}.${shotIndex + 1} [${shot.cameraType.toUpperCase()}] (${shot.duration}s):\n`;

            // Visual Description
            prompt += `  Visual: ${shot.visualDescription}\n`;

            // Characters in shot
            if (shot.characters && shot.characters.length > 0) {
                prompt += `  Characters Present: ${shot.characters.join(', ')}\n`;
            }

            // Camera Focus
            if (shot.cameraFocus) {
                prompt += `  Camera Focus: ${shot.cameraFocus}\n`;
            }

            // Dialogue with speaker and emotion
            if (shot.dialogue) {
                prompt += `  Dialogue: "${shot.dialogue}"\n`;
                if (shot.speaker) {
                    prompt += `  Speaker: ${shot.speaker}\n`;
                    if (shot.characterEmotion) {
                        prompt += `  Speaker's Facial Expression: ${shot.characterEmotion}\n`;
                    }
                }
            }

            // Emotional tone
            prompt += `  Emotional Tone: ${shot.emotionTag}\n`;
            prompt += `\n`;
        });
    }

    // Technical Requirements
    prompt += `**TECHNICAL REQUIREMENTS:**\n`;
    prompt += `- Duration: EXACTLY ${scene.duration} seconds\n`;
    prompt += `- Maintain character consistency as described above\n`;
    if (location && location.locked) {
        prompt += `- Maintain location consistency with previous scenes\n`;
    }
    prompt += `- Camera movements should be smooth and cinematic\n`;
    prompt += `- Lighting should match time of day: ${location?.timeOfDay || 'as appropriate'}\n`;

    // Dialog language note
    const hasDialogue = scene.shots?.some(shot => shot.dialogue);
    if (hasDialogue) {
        prompt += `- Character dialogue is provided in the specified language\n`;
        prompt += `- Ensure lip-sync matches dialogue delivery\n`;
        prompt += `- Facial expressions must match the speaker's emotion\n`;
    }

    return {
        sceneNumber: sceneIndex + 1,
        sceneTitle: scene.title,
        sceneDuration: scene.duration,
        prompt: prompt,
        characterCount: sceneCharacters.length,
        shotCount: scene.shots?.length || 0,
        hasDialogue: hasDialogue
    };
};

/**
 * Build a combined VEO prompt (for backward compatibility or overview)
 */
export const buildVEOPrompt = (characters, locations, scenes) => {
    const scenePrompts = buildAllSceneVeoPrompts(characters, locations, scenes);

    if (scenePrompts.length === 0) {
        return 'No scenes created yet. Start building your story!';
    }

    let fullPrompt = `=== MULTI-SCENE VEO PROJECT ===\n\n`;
    fullPrompt += `Total Scenes: ${scenes.length}\n`;
    fullPrompt += `Total Duration: ${scenes.reduce((sum, scene) => sum + (scene.duration || 0), 0)} seconds\n`;
    fullPrompt += `\n`;
    fullPrompt += `NOTE: VEO cannot generate all scenes at once. Generate each scene separately using the prompts below.\n`;
    fullPrompt += `\n${'='.repeat(80)}\n\n`;

    scenePrompts.forEach((scenePrompt, index) => {
        fullPrompt += scenePrompt.prompt;
        if (index < scenePrompts.length - 1) {
            fullPrompt += `\n${'='.repeat(80)}\n\n`;
        }
    });

    return fullPrompt;
};

/**
 * Build a human-readable preview of the story
 */
export const buildStoryPreview = (scenes, locations, characters) => {
    if (!scenes || scenes.length === 0) {
        return 'No scenes created yet. Start building your story!';
    }

    let preview = '';

    scenes.forEach((scene, index) => {
        const location = locations.find(loc => loc.id === scene.locationId);
        const shotCount = scene.shots ? scene.shots.length : 0;
        const totalShotDuration = scene.shots
            ? scene.shots.reduce((sum, shot) => sum + (shot.duration || 0), 0)
            : 0;

        preview += `Scene ${index + 1}: ${scene.title}\n`;
        preview += `📍 ${location ? location.name : 'No location'} | ⏱️ ${scene.duration}s | 🎬 ${shotCount} shots\n`;
        preview += `Purpose: ${scene.purpose}\n`;
        preview += `Arc: ${scene.emotionalArc}\n`;

        if (shotCount > 0) {
            preview += `Shots breakdown (${totalShotDuration}s total):\n`;
            scene.shots.forEach((shot, shotIndex) => {
                const speakerInfo = shot.speaker ? ` [${shot.speaker}${shot.characterEmotion ? ` - ${shot.characterEmotion}` : ''}]` : '';
                preview += `  ${shotIndex + 1}. ${shot.cameraType}${speakerInfo} - ${shot.visualDescription.substring(0, 50)}${shot.visualDescription.length > 50 ? '...' : ''}\n`;
            });
        }

        preview += '\n';
    });

    return preview;
};
