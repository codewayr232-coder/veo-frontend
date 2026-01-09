import React, { useState } from 'react';
import { Sparkles, Zap, Loader2, Languages as LanguagesIcon, Film, Smartphone, Camera, Award, TrendingUp } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { LANGUAGES, STORY_STYLES, AI_SCENE_DURATION } from '../../utils/constants';
import { api } from '../../services/api';

export const StoryGenerator = ({ isOpen, onClose }) => {
    const { addCharacter, addLocation, addScene, showToast, updateTokens, user } = useApp();
    const [storyIdea, setStoryIdea] = useState('');
    const [videoLength, setVideoLength] = useState(60); // Total video length in seconds
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [selectedStyle, setSelectedStyle] = useState('drama');
    const [selectedMode, setSelectedMode] = useState('cinematic'); // Generation mode
    const [useEnhancement, setUseEnhancement] = useState(false); // Enhancement toggle
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedData, setGeneratedData] = useState(null);
    const [enhancementScores, setEnhancementScores] = useState(null); // Agent scores

    // Calculate number of scenes based on video length
    const calculatedScenes = Math.max(1, Math.round(videoLength / AI_SCENE_DURATION));

    // Token costs
    const STANDARD_TOKEN_COST = 10;
    const ENHANCED_TOKEN_COST = 20;
    const tokenCost = useEnhancement ? ENHANCED_TOKEN_COST : STANDARD_TOKEN_COST;

    const handleGenerate = async () => {
        if (!storyIdea.trim()) {
            showToast('Please enter your story idea', 'error');
            return;
        }

        // Check token balance
        if (user.tokens < tokenCost) {
            showToast(`Insufficient tokens. Need ${tokenCost} tokens.`, 'error');
            return;
        }

        setIsGenerating(true);
        setEnhancementScores(null);

        try {
            const storyData = {
                storyIdea,
                videoLength,
                numberOfScenes: calculatedScenes,
                language: selectedMode === 'youtube-shorts' ? 'hi' : selectedLanguage,
                style: selectedStyle,
                sceneDuration: selectedMode === 'youtube-shorts' ? 8 : AI_SCENE_DURATION,
                mode: selectedMode,
            };

            let response;

            if (useEnhancement) {
                // Use enhanced generation
                response = await api.story.generateEnhanced(storyData);

                // Extract story and enhancement data
                setGeneratedData(response.data.story);
                setEnhancementScores(response.data.enhancement);

                showToast(`✨ Enhanced story generated! (${tokenCost} tokens used)`, 'success');
            } else {
                // Use standard generation
                response = await api.story.generate(storyData);
                setGeneratedData(response.data);

                showToast(`Story generated! (${tokenCost} tokens used)`, 'success');
            }

            // Deduct tokens
            await api.payment.deduct(tokenCost);
            updateTokens(user.tokens - tokenCost);

        } catch (error) {
            console.error('Story generation error:', error);
            showToast(
                error instanceof Error ? error.message : 'Failed to generate story. Make sure backend is running.',
                'error'
            );

            // Fallback to mock data for demo if backend is not available
            const mockData = generateMockStory(storyIdea, selectedLanguage, selectedStyle, calculatedScenes);
            setGeneratedData(mockData);
            showToast('Using mock data - start backend server to use Gemini AI', 'info', 5000);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleApply = () => {
        if (!generatedData) return;

        // Add generated characters
        generatedData.characters.forEach(char => {
            addCharacter(char, true);
        });

        // Add generated locations
        generatedData.locations.forEach(loc => {
            addLocation(loc, true);
        });

        // Add generated scenes
        generatedData.scenes.forEach(scene => {
            addScene(scene, true);
        });

        showToast(
            `Created ${generatedData.characters.length} characters, ${generatedData.locations.length} locations, and ${generatedData.scenes.length} scenes`,
            'success',
            5000
        );

        // Reset and close
        setStoryIdea('');
        setGeneratedData(null);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="AI Story Generator"
            size="xl"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-secondary">
                        Describe your story idea and let AI create characters, locations, and scenes automatically
                    </p>
                </div>

                {!generatedData ? (
                    <>
                        {/* Story Idea Input */}
                        <Textarea
                            label="Your Story Idea"
                            value={storyIdea}
                            onChange={(e) => setStoryIdea(e.target.value)}
                            placeholder="Example: A detective investigates a mysterious disappearance in a futuristic city..."
                            rows={6}
                            autoResize
                            maxLength={2000}
                            showCount
                            helperText="Describe your story concept, characters, setting, and key plot points"
                        />

                        {/* Generation Mode Selector */}
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-3">
                                Generation Mode
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {/* Cinematic Mode */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedMode('cinematic')}
                                    className={`p-4 rounded-xl border-2 transition-all ${selectedMode === 'cinematic'
                                        ? 'border-primary-500 bg-primary-500/10'
                                        : 'border-[rgb(var(--color-border))] hover:border-primary-500/50'
                                        }`}
                                >
                                    <Film className={`w-6 h-6 mx-auto mb-2 ${selectedMode === 'cinematic' ? 'text-primary-500' : 'text-secondary'}`} />
                                    <div className="text-sm font-medium mb-1">Cinematic</div>
                                    <div className="text-xs text-tertiary">Movie-style storytelling</div>
                                </button>

                                {/* YouTube Shorts Mode */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedMode('youtube-shorts')}
                                    className={`p-4 rounded-xl border-2 transition-all ${selectedMode === 'youtube-shorts'
                                        ? 'border-red-500 bg-red-500/10'
                                        : 'border-[rgb(var(--color-border))] hover:border-red-500/50'
                                        }`}
                                >
                                    <Smartphone className={`w-6 h-6 mx-auto mb-2 ${selectedMode === 'youtube-shorts' ? 'text-red-500' : 'text-secondary'}`} />
                                    <div className="text-sm font-medium mb-1">Hulk YouTube Shorts</div>
                                    <div className="text-xs text-tertiary">Viral vertical video</div>
                                    {selectedMode === 'youtube-shorts' && (
                                        <div className="mt-2 text-xs text-red-500 font-medium">
                                            • 8s scenes<br />
                                            • Hindi only<br />
                                            • 9:16 format
                                        </div>
                                    )}
                                </button>

                                {/* Photo Realistic Mode */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedMode('photo-realistic')}
                                    className={`p-4 rounded-xl border-2 transition-all ${selectedMode === 'photo-realistic'
                                        ? 'border-accent-500 bg-accent-500/10'
                                        : 'border-[rgb(var(--color-border))] hover:border-accent-500/50'
                                        }`}
                                >
                                    <Camera className={`w-6 h-6 mx-auto mb-2 ${selectedMode === 'photo-realistic' ? 'text-accent-500' : 'text-secondary'}`} />
                                    <div className="text-sm font-medium mb-1">Photo Realistic</div>
                                    <div className="text-xs text-tertiary">Ultra-realistic visuals</div>
                                </button>
                            </div>
                        </div>

                        {/* Video Length Input */}
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">
                                Total Video Length
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <input
                                        type="range"
                                        min="8"
                                        max="300"
                                        step="8"
                                        value={videoLength}
                                        onChange={(e) => setVideoLength(parseInt(e.target.value))}
                                        className="w-full h-2 bg-[rgb(var(--color-bg-secondary))] rounded-lg appearance-none cursor-pointer accent-primary-600"
                                    />
                                    <div className="flex justify-between text-xs text-tertiary mt-1">
                                        <span>8s</span>
                                        <span>5min</span>
                                    </div>
                                </div>
                                <div className="text-right min-w-[100px]">
                                    <div className="text-2xl font-bold text-primary">
                                        {Math.floor(videoLength / 60)}:{(videoLength % 60).toString().padStart(2, '0')}
                                    </div>
                                    <div className="text-xs text-tertiary">{videoLength} seconds</div>
                                </div>
                            </div>
                            <div className="mt-3 p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-primary-700 dark:text-primary-300">
                                        📊 AI will generate <strong>{calculatedScenes} scenes</strong>
                                    </span>
                                    <span className="text-xs text-tertiary">
                                        ({AI_SCENE_DURATION}s each)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Language Selection */}
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">
                                    <div className="flex items-center gap-2">
                                        <LanguagesIcon className="w-4 h-4" />
                                        <span>Dialogue Language</span>
                                    </div>
                                </label>
                                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-[rgb(var(--color-bg-secondary))] rounded-lg">
                                    {LANGUAGES.map(lang => (
                                        <button
                                            key={lang.value}
                                            type="button"
                                            onClick={() => setSelectedLanguage(lang.value)}
                                            className={`
                        p-2 rounded-lg text-left border-2 transition-all
                        ${selectedLanguage === lang.value
                                                    ? 'border-primary-500 bg-primary-500/10'
                                                    : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-border-hover))]'
                                                }
                      `}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{lang.flag}</span>
                                                <span className="text-sm font-medium">{lang.label}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Story Style Selection */}
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">
                                    Story Style
                                </label>
                                <div className="space-y-2">
                                    {STORY_STYLES.map(style => (
                                        <button
                                            key={style.value}
                                            type="button"
                                            onClick={() => setSelectedStyle(style.value)}
                                            className={`
                        w-full p-2 rounded-lg text-left border-2 transition-all
                        ${selectedStyle === style.value
                                                    ? 'border-primary-500 bg-primary-500/10'
                                                    : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-border-hover))]'
                                                }
                      `}
                                        >
                                            <div className="font-medium text-sm">{style.label}</div>
                                            <div className="text-xs text-tertiary">{style.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enhancement Toggle */}
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-purple-500" />
                                    <span className="font-semibold text-purple-700 dark:text-purple-300">
                                        AI Enhancement
                                    </span>
                                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                                        BETA
                                    </span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={useEnhancement}
                                        onChange={(e) => setUseEnhancement(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <TrendingUp className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-purple-700 dark:text-purple-300">
                                            Multi-Agent AI Quality System
                                        </p>
                                        <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">
                                            5 specialized AI agents review & enhance your story:
                                        </p>
                                        <ul className="text-xs text-purple-600/70 dark:text-purple-400/70 mt-2 space-y-1 list-disc list-inside ml-2">
                                            <li>Scene Director - narrative structure</li>
                                            <li>Emotion Validator - authentic emotions</li>
                                            <li>Timing Optimizer - perfect pacing</li>
                                            <li>Veo Enhancer - cinematic visuals</li>
                                            <li>Quality Critic - final approval (85+ score)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-purple-500/20">
                                    <span className="text-xs text-purple-600/80 dark:text-purple-400/80">
                                        {useEnhancement ? '~20s processing time' : '~5s processing time'}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="font-bold text-purple-700 dark:text-purple-300">
                                            {tokenCost} tokens
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <div className="flex gap-3">
                                <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div className="text-sm space-y-1">
                                    <p className="font-medium text-blue-700 dark:text-blue-400">AI Generation Features:</p>
                                    <ul className="text-blue-600 dark:text-blue-300 space-y-0.5 list-disc list-inside">
                                        <li>Automatic character creation with descriptions</li>
                                        <li>Smart character locking for main characters</li>
                                        <li>Location generation with time-of-day settings</li>
                                        <li>Exactly {calculatedScenes} scenes × {AI_SCENE_DURATION}s = {videoLength}s total</li>
                                        <li>Dialogue generation in {LANGUAGES.find(l => l.value === selectedLanguage)?.label}</li>
                                        <li>Camera angles and shot selection</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--color-border))]">
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <div className="flex items-center gap-2 mr-2 text-sm text-secondary">
                                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span>{user?.tokens || 0} tokens available</span>
                            </div>
                            <Button
                                onClick={handleGenerate}
                                loading={isGenerating}
                                disabled={!storyIdea.trim() || isGenerating}
                                icon={Sparkles}
                                size="lg"
                            >
                                {isGenerating ? 'Generating Story...' : 'Generate Story with AI'}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Generated Story Preview */}
                        <div className="space-y-4">
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-medium mb-2">
                                    <Sparkles className="w-5 h-5" />
                                    <span>Story Generated Successfully!</span>
                                </div>
                                <div className="text-sm text-green-600 dark:text-green-300 space-y-1">
                                    <p>✓ {generatedData.characters.length} Characters created</p>
                                    <p>✓ {generatedData.locations.length} Locations defined</p>
                                    <p>✓ {generatedData.scenes.length} Scenes generated ({generatedData.scenes.length * AI_SCENE_DURATION}s total)</p>
                                </div>
                            </div>

                            {/* Enhancement Scores Display */}
                            {enhancementScores && (
                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Award className="w-5 h-5 text-purple-500" />
                                        <span className="font-semibold text-purple-700 dark:text-purple-300">
                                            Quality Enhancement Report
                                        </span>
                                        {enhancementScores.approved && (
                                            <span className="px-2 py-0.5 bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                                                ✓ APPROVED
                                            </span>
                                        )}
                                    </div>

                                    {/* Overall Score */}
                                    <div className="mb-4 p-3 bg-purple-500/10 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                Overall Quality Score
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                    {enhancementScores.scores?.overall || enhancementScores.scores?.critic || 0}
                                                </div>
                                                <span className="text-sm text-purple-600/70 dark:text-purple-400/70">/100</span>
                                            </div>
                                        </div>
                                        <div className="mt-2 w-full bg-purple-200 dark:bg-purple-900/30 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                                                style={{ width: `${enhancementScores.scores?.overall || enhancementScores.scores?.critic || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Individual Agent Scores */}
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-purple-700/70 dark:text-purple-300/70 mb-2">
                                            Agent Performance:
                                        </p>
                                        {enhancementScores.scores?.sceneDirector !== undefined && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-purple-600/80 dark:text-purple-400/80">🎯 Scene Director</span>
                                                <span className="font-semibold text-purple-700 dark:text-purple-300">
                                                    {enhancementScores.scores.sceneDirector}/100
                                                </span>
                                            </div>
                                        )}
                                        {enhancementScores.scores?.emotionValidator !== undefined && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-purple-600/80 dark:text-purple-400/80">❤️ Emotion Validator</span>
                                                <span className="font-semibold text-purple-700 dark:text-purple-300">
                                                    {enhancementScores.scores.emotionValidator}/100
                                                </span>
                                            </div>
                                        )}
                                        {enhancementScores.scores?.timingDensity !== undefined && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-purple-600/80 dark:text-purple-400/80">⏱️ Timing & Density</span>
                                                <span className="font-semibold text-purple-700 dark:text-purple-300">
                                                    {enhancementScores.scores.timingDensity}/100
                                                </span>
                                            </div>
                                        )}
                                        {enhancementScores.scores?.veoOptimizer !== undefined && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-purple-600/80 dark:text-purple-400/80">🎥 Veo Optimizer</span>
                                                <span className="font-semibold text-purple-700 dark:text-purple-300">
                                                    {enhancementScores.scores.veoOptimizer}/100
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Enhancement Stats */}
                                    <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs">
                                        <span className="text-purple-600/70 dark:text-purple-400/70">
                                            Iterations: {enhancementScores.iterations}/{3}
                                        </span>
                                        <span className="text-purple-600/70 dark:text-purple-400/70">
                                            Time: {(enhancementScores.processingTime / 1000).toFixed(1)}s
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Preview */}
                            <div className="max-h-96 overflow-y-auto space-y-4 bg-[rgb(var(--color-bg-secondary))] p-4 rounded-lg">
                                <div>
                                    <h4 className="font-semibold mb-2">Characters:</h4>
                                    <div className="space-y-2">
                                        {generatedData.characters.map((char, idx) => (
                                            <div key={idx} className="text-sm bg-[rgb(var(--color-bg-primary))] p-3 rounded border border-[rgb(var(--color-border))]">
                                                <span className="font-medium">{char.name}:</span> {char.physicalDescription}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Locations:</h4>
                                    <div className="space-y-2">
                                        {generatedData.locations.map((loc, idx) => (
                                            <div key={idx} className="text-sm bg-[rgb(var(--color-bg-primary))] p-3 rounded border border-[rgb(var(--color-border))]">
                                                <span className="font-medium">{loc.name}:</span> {loc.environmentDescription}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Scenes:</h4>
                                    <div className="space-y-2">
                                        {generatedData.scenes.map((scene, idx) => (
                                            <div key={idx} className="text-sm bg-[rgb(var(--color-bg-primary))] p-3 rounded border border-[rgb(var(--color-border))]">
                                                <div className="font-medium mb-1">Scene {idx + 1}: {scene.title} ({AI_SCENE_DURATION}s)</div>
                                                <div className="text-tertiary">{scene.purpose}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Apply Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--color-border))]">
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setGeneratedData(null);
                                        setStoryIdea('');
                                    }}
                                >
                                    Start Over
                                </Button>
                                <Button onClick={handleApply} icon={Zap}>
                                    Apply to Story Canvas
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

// Mock story generator for demo (will be replaced with real API)
function generateMockStory(idea, language, style, numberOfScenes) {
    const characters = [
        {
            name: 'Detective Sarah Chen',
            physicalDescription: 'Mid-30s, Asian woman with sharp eyes and short black hair, athletic build',
            clothing: 'Dark trench coat, professional attire',
            personality: 'Determined, analytical, compassionate',
            defaultEmotion: 'neutral',
            locked: true, // Main character - automatically locked
        },
        {
            name: 'Marcus Stone',
            physicalDescription: 'Late 40s, tall man with graying hair and weathered features',
            clothing: 'Worn jacket, casual street wear',
            personality: 'Mysterious, reserved, knowledgeable',
            defaultEmotion: 'calm',
            locked: true, // Important recurring character - locked
        },
    ];

    const locations = [
        {
            name: 'Neon District',
            environmentDescription: 'Bustling futuristic city street with holographic advertisements and neon lights',
            timeOfDay: 'night',
            soundscape: 'Urban traffic, distant music, electronic hums',
            locked: true, // Primary location - locked
        },
        {
            name: 'Old Warehouse',
            environmentDescription: 'Abandoned industrial building with broken windows and scattered debris',
            timeOfDay: 'dusk',
            soundscape: 'Wind whistling, creaking metal, distant sirens',
            locked: false,
        },
    ];

    // Generate scenes based on requested number
    const sceneTemplates = [
        {
            title: 'Discovery',
            purpose: 'Detective Chen investigates the crime scene',
            emotionalArc: 'rising',
            dialogue: 'This doesn\'t add up. Someone was here recently.',
        },
        {
            title: 'The Lead',
            purpose: 'Chen meets Marcus who has information',
            emotionalArc: 'steady',
            dialogue: 'You\'re looking in the wrong place, detective.',
        },
        {
            title: 'Revelation',
            purpose: 'Marcus reveals crucial information',
            emotionalArc: 'climax',
            dialogue: 'The disappearance... it was just the beginning.',
        },
        {
            title: 'Pursuit',
            purpose: 'Action sequence through the city',
            emotionalArc: 'rising',
            dialogue: 'We need to move, now!',
        },
        {
            title: 'Confrontation',
            purpose: 'Face-to-face with the antagonist',
            emotionalArc: 'climax',
            dialogue: 'It ends here.',
        },
        {
            title: 'Escape',
            purpose: 'Narrow escape from danger',
            emotionalArc: 'falling',
            dialogue: 'That was too close...',
        },
        {
            title: 'Resolution',
            purpose: 'Wrapping up the mystery',
            emotionalArc: 'resolution',
            dialogue: 'Finally, the truth comes out.',
        },
    ];

    // Take only the number of scenes needed
    const scenes = sceneTemplates.slice(0, numberOfScenes).map((template, idx) => ({
        title: template.title,
        purpose: template.purpose,
        duration: AI_SCENE_DURATION,
        emotionalArc: template.emotionalArc,
        shots: [
            {
                cameraType: idx % 2 === 0 ? 'wide' : 'medium',
                duration: AI_SCENE_DURATION,
                visualDescription: `${template.purpose} - cinematic ${idx % 2 === 0 ? 'wide' : 'medium'} shot`,
                dialogue: template.dialogue,
                emotionTag: template.emotionalArc === 'climax' ? 'tension' : 'neutral',
            },
        ],
    }));

    return { characters, locations, scenes };
}
