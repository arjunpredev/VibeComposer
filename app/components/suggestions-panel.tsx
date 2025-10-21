interface SuggestionsPanelProps {
	onSuggestionClick: (text: string) => void;
}

const SUGGESTIONS = [
	{
		title: "Ambient Pad",
		description: "Soft, evolving ambient music",
		prompt: "Create an ambient pad with slow evolving notes and reverb",
	},
	{
		title: "Drum Loop",
		description: "Basic beat pattern",
		prompt: "Generate a simple drum loop with kick, snare and hi-hat",
	},
	{
		title: "Bass Synth",
		description: "Deep bass sequence",
		prompt: "Make a deep bassline with a saw synth, pulsing rhythm",
	},
	{
		title: "Melodic Arpeggio",
		description: "Flowing melodic pattern",
		prompt: "Create a flowing arpeggiated melody with scale patterns",
	},
	{
		title: "Granular Texture",
		description: "Experimental sound",
		prompt: "Generate granular synthesis texture with randomized parameters",
	},
	{
		title: "Polyrhythm",
		description: "Complex layered rhythms",
		prompt: "Create interlocking polyrhythmic patterns with different tempos",
	},
	{
		title: "Techno Beat",
		description: "Four-on-the-floor kick pattern",
		prompt: "Generate a driving techno beat with steady kick and shuffled hats",
	},
	{
		title: "Lo-fi Hip Hop",
		description: "Chill beats with vinyl vibes",
		prompt:
			"Create a lo-fi hip hop beat with chops, warm drums and jazzy chords",
	},
	{
		title: "Pad Chord Progression",
		description: "Evolving harmonic pad",
		prompt: "Make a slow chord progression with lush pad sounds and delay",
	},
	{
		title: "Pluck Melody",
		description: "Bright staccato notes",
		prompt: "Generate a bright plucked melody with articulate notes and reverb",
	},
	{
		title: "Glitchy Rhythms",
		description: "Chopped and stuttered beats",
		prompt: "Create glitchy rhythmic patterns with stutters and bit reduction",
	},
	{
		title: "Orchestral Strings",
		description: "Sweeping string section",
		prompt: "Make a sweeping orchestral string pad with dynamic expression",
	},
	{
		title: "Hypersynth",
		description: "Futuristic synth textures",
		prompt:
			"Generate futuristic synth textures with pitch modulation and effects",
	},
	{
		title: "Perlin Noise Evolve",
		description: "Smooth generative patterns",
		prompt:
			"Create a generative piece using Perlin noise for smooth parameter changes",
	},
	{
		title: "Breakbeat",
		description: "Complex drum breakdown",
		prompt: "Generate a complex breakbeat with syncopated drum patterns",
	},
	{
		title: "Bell Tones",
		description: "Ringing metallic sounds",
		prompt: "Make bell-like tones with long decay and harmonic content",
	},
	{
		title: "Wobble Bass",
		description: "Modulated sub-bass",
		prompt: "Create a wobbling bass with LFO modulation and heavy compression",
	},
	{
		title: "Chop Vocal",
		description: "Rhythmic vocal slices",
		prompt: "Generate rhythmic vocal chops with stuttering effects",
	},
	{
		title: "Atmospheric Drone",
		description: "Sparse evolving tones",
		prompt: "Make a sparse atmospheric drone with layered sine waves",
	},
	{
		title: "Stepper Melody",
		description: "Stepped note sequences",
		prompt: "Create stepped melodic sequences with controlled pitch jumps",
	},
	{
		title: "Retro 8-bit",
		description: "Chiptune style sounds",
		prompt: "Generate retro 8-bit chiptune melodies with square waves",
	},
	{
		title: "Filtered Sweep",
		description: "Filtered resonant sequences",
		prompt: "Make filtering sweeps with resonant peaks across frequencies",
	},
	{
		title: "Fractal Sequence",
		description: "Self-similar repeating patterns",
		prompt: "Create fractal-inspired sequences with recursive patterns",
	},
	{
		title: "Delay Tapestry",
		description: "Layered delayed repetitions",
		prompt: "Generate layered delay effects creating a rich tapestry of sound",
	},
	{
		title: "Additive Harmonic",
		description: "Built from harmonics",
		prompt: "Make music by layering harmonic overtones with gradual evolution",
	},
	{
		title: "Random Melody",
		description: "Chance-based generation",
		prompt: "Create randomized melodies within a scale with constraints",
	},
];

export function SuggestionsPanel({ onSuggestionClick }: SuggestionsPanelProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="text-white/70 text-sm">
				<p className="font-semibold text-white mb-1">Try Something</p>
				<p>Click a suggestion to get started</p>
			</div>

			<div className="grid grid-cols-1 gap-2">
				{SUGGESTIONS.map((suggestion) => (
					<button
						key={suggestion.title}
						onClick={() => onSuggestionClick(suggestion.prompt)}
						className="text-left p-3 border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer group"
					>
						<div className="font-semibold text-white group-hover:text-white transition-colors">
							{suggestion.title}
						</div>
						<div className="text-xs text-white/60 group-hover:text-white/70 transition-colors">
							{suggestion.description}
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
