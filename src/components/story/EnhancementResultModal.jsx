import React from 'react';
import { Award, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const EnhancementResultModal = ({ isOpen, onClose, enhancementScores, onApply, onDiscard }) => {
    if (!enhancementScores) return null;

    const overallScore = enhancementScores.scores?.overall || enhancementScores.scores?.critic || 0;
    const approved = enhancementScores.approved;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Enhancement Complete" size="lg">
            <div className="space-y-6">
                {/* Status Banner */}
                <div className={`p-4 rounded-lg ${approved ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'}`}>
                    <div className="flex items-center gap-3">
                        {approved ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                            <TrendingUp className="w-6 h-6 text-yellow-500" />
                        )}
                        <div>
                            <h3 className="font-semibold text-lg">
                                {approved ? '✅ Quality Approved' : '⚠️ Quality Review'}
                            </h3>
                            <p className="text-sm text-secondary">
                                {approved
                                    ? 'Your story meets the quality threshold (85+)'
                                    : 'Story enhanced but below approval threshold'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Overall Score */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                            Overall Quality Score
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                                {overallScore}
                            </div>
                            <span className="text-xl text-purple-600/70 dark:text-purple-400/70">/100</span>
                        </div>
                    </div>
                    <div className="w-full bg-purple-200 dark:bg-purple-900/30 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                            style={{ width: `${overallScore}%` }}
                        ></div>
                    </div>
                </div>

                {/* Agent Scores */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-tertiary">Agent Performance:</h4>

                    {enhancementScores.scores?.sceneDirector !== undefined && (
                        <div className="flex items-center justify-between p-3 bg-[rgb(var(--color-bg-secondary))] rounded-lg">
                            <span className="text-sm">🎯 Scene Director</span>
                            <span className="font-semibold">{enhancementScores.scores.sceneDirector}/100</span>
                        </div>
                    )}

                    {enhancementScores.scores?.emotionValidator !== undefined && (
                        <div className="flex items-center justify-between p-3 bg-[rgb(var(--color-bg-secondary))] rounded-lg">
                            <span className="text-sm">❤️ Emotion Validator</span>
                            <span className="font-semibold">{enhancementScores.scores.emotionValidator}/100</span>
                        </div>
                    )}

                    {enhancementScores.scores?.timingDensity !== undefined && (
                        <div className="flex items-center justify-between p-3 bg-[rgb(var(--color-bg-secondary))] rounded-lg">
                            <span className="text-sm">⏱️ Timing & Density</span>
                            <span className="font-semibold">{enhancementScores.scores.timingDensity}/100</span>
                        </div>
                    )}

                    {enhancementScores.scores?.veoOptimizer !== undefined && (
                        <div className="flex items-center justify-between p-3 bg-[rgb(var(--color-bg-secondary))] rounded-lg">
                            <span className="text-sm">🎥 Veo Optimizer</span>
                            <span className="font-semibold">{enhancementScores.scores.veoOptimizer}/100</span>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-tertiary border-t border-[rgb(var(--color-border))] pt-4">
                    <span>Iterations: {enhancementScores.iterations}/3</span>
                    <span>Processing Time: {(enhancementScores.processingTime / 1000).toFixed(1)}s</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={onDiscard}
                        className="flex-1"
                        icon={XCircle}
                    >
                        Discard
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onApply}
                        className="flex-1"
                        icon={Award}
                    >
                        Apply Changes
                    </Button>
                </div>

                <p className="text-xs text-center text-tertiary">
                    Applying changes will update your scenes on the canvas and save to database
                </p>
            </div>
        </Modal>
    );
};
