import React, { useState } from 'react';
import { Header } from './Header';
import { CharacterPanel } from '../characters/CharacterPanel';
import { LocationPanel } from '../locations/LocationPanel';
import { StoryCanvas } from '../story/StoryCanvas';
import { PromptPreview } from '../prompt/PromptPreview';
import { StoryGenerator } from '../generation/StoryGenerator';

export const AppLayout = () => {
    const [leftTab, setLeftTab] = useState('characters'); // characters | locations
    const [showPromptPreview, setShowPromptPreview] = useState(true);
    const [isStoryGeneratorOpen, setIsStoryGeneratorOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Header
                onVersionHistoryClick={() => {/* TODO */ }}
                onGenerateStory={() => setIsStoryGeneratorOpen(true)}
            />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Characters & Locations */}
                <div className="w-80 border-r border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] flex flex-col">
                    {/* Tabs */}
                    <div className="flex border-b border-[rgb(var(--color-border))]">
                        <button
                            onClick={() => setLeftTab('characters')}
                            className={`
                flex-1 px-4 py-3 text-sm font-medium transition-all
                ${leftTab === 'characters'
                                    ? 'bg-[rgb(var(--color-bg-secondary))] text-primary border-b-2 border-primary-600'
                                    : 'text-tertiary hover:text-primary hover:bg-[rgb(var(--color-bg-secondary))]'
                                }
              `}
                        >
                            Characters
                        </button>
                        <button
                            onClick={() => setLeftTab('locations')}
                            className={`
                flex-1 px-4 py-3 text-sm font-medium transition-all
                ${leftTab === 'locations'
                                    ? 'bg-[rgb(var(--color-bg-secondary))] text-primary border-b-2 border-primary-600'
                                    : 'text-tertiary hover:text-primary hover:bg-[rgb(var(--color-bg-secondary))]'
                                }
              `}
                        >
                            Locations
                        </button>
                    </div>

                    {/* Panel Content */}
                    <div className="flex-1 overflow-hidden">
                        {leftTab === 'characters' ? <CharacterPanel /> : <LocationPanel />}
                    </div>
                </div>

                {/* Main Canvas */}
                <div className="flex-1 overflow-hidden">
                    <StoryCanvas />
                </div>

                {/* Right Panel - Prompt Preview */}
                {showPromptPreview && (
                    <div className="w-96 border-l border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))]">
                        <PromptPreview />
                    </div>
                )}
            </div>

            {/* Story Generator Modal */}
            <StoryGenerator
                isOpen={isStoryGeneratorOpen}
                onClose={() => setIsStoryGeneratorOpen(false)}
            />
        </div>
    );
};
