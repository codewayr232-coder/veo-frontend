{/* Enhancement Toggle */ }
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

