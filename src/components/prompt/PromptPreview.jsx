import React, { useEffect, useState } from 'react';
import { Copy, Check, Film, Users, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { buildAllSceneVeoPrompts, buildVEOPrompt } from '../../utils/promptBuilder';
import { Button } from '../common/Button';
import { Tooltip } from '../common/Tooltip';

export const PromptPreview = () => {
    const { characters, locations, scenes } = useApp();
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const [scenePrompts, setScenePrompts] = useState([]);
    const [fullPrompt, setFullPrompt] = useState('');

    useEffect(() => {
        const prompts = buildAllSceneVeoPrompts(characters, locations, scenes);
        setScenePrompts(prompts);
        const combined = buildVEOPrompt(characters, locations, scenes);
        setFullPrompt(combined);

        // Reset to first tab if current tab is out of range
        if (selectedTab >= prompts.length && prompts.length > 0) {
            setSelectedTab(0);
        }
    }, [characters, locations, scenes]);

    const handleCopy = async (text, index = null) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const renderScenePrompt = (scenePrompt, index) => (
        <div key={index} className="h-full flex flex-col">
            {/* Scene Metadata */}
            <div className="px-4 py-3 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-b border-[rgb(var(--color-border))]">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">
                        Scene {scenePrompt.sceneNumber}: {scenePrompt.sceneTitle}
                    </h3>
                    <Tooltip content={copiedIndex === index ? 'Copied!' : 'Copy scene prompt'}>
                        <Button
                            size="sm"
                            variant="ghost"
                            icon={copiedIndex === index ? Check : Copy}
                            onClick={() => handleCopy(scenePrompt.prompt, index)}
                        >
                            {copiedIndex === index ? 'Copied' : 'Copy'}
                        </Button>
                    </Tooltip>
                </div>
                <div className="flex items-center gap-4 text-xs text-secondary">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{scenePrompt.sceneDuration}s</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Film className="w-4 h-4" />
                        <span>{scenePrompt.shotCount} shots</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{scenePrompt.characterCount} characters</span>
                    </div>
                    {scenePrompt.hasDialogue && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-700 dark:text-green-300 rounded">
                            Has Dialogue
                        </span>
                    )}
                </div>
            </div>

            {/* Prompt Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <pre className="text-xs font-mono text-secondary whitespace-pre-wrap bg-[rgb(var(--color-bg-primary))] p-4 rounded-lg border border-[rgb(var(--color-border))]">
                    {scenePrompt.prompt}
                </pre>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col bg-[rgb(var(--color-bg-secondary))]">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[rgb(var(--color-border))] flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">VEO Prompt Preview</h2>
                    <p className="text-xs text-tertiary mt-0.5">
                        {scenePrompts.length > 0
                            ? `${scenePrompts.length} scene${scenePrompts.length !== 1 ? 's' : ''} - Generate each separately in VEO`
                            : 'Live-generated prompts'
                        }
                    </p>
                </div>
                {scenePrompts.length > 0 && (
                    <Tooltip content={copiedIndex === 'all' ? 'Copied!' : 'Copy all scenes'}>
                        <Button
                            size="sm"
                            variant="ghost"
                            icon={copiedIndex === 'all' ? Check : Copy}
                            onClick={() => handleCopy(fullPrompt, 'all')}
                        >
                            {copiedIndex === 'all' ? 'Copied' : 'Copy All'}
                        </Button>
                    </Tooltip>
                )}
            </div>

            {scenePrompts.length > 0 ? (
                <>
                    {/* Scene Tabs */}
                    <div className="px-4 py-2 border-b border-[rgb(var(--color-border))] overflow-x-auto">
                        <div className="flex gap-2">
                            {scenePrompts.map((scenePrompt, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedTab(index)}
                                    className={`
                                        px-4 py-2 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap
                                        ${selectedTab === index
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-[rgb(var(--color-bg-primary))] text-secondary hover:bg-[rgb(var(--color-bg-tertiary))]'
                                        }
                                    `}
                                >
                                    Scene {scenePrompt.sceneNumber}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Scene Prompt */}
                    <div className="flex-1 overflow-hidden">
                        {scenePrompts[selectedTab] && renderScenePrompt(scenePrompts[selectedTab], selectedTab)}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center py-12 text-tertiary">
                        <Film className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">
                            Start building your story to see scene-by-scene VEO prompts
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
