import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";

export function ApiKeyInput() {
	const { apiKey, setApiKey, clearApiKey } = useStore();
	const [inputValue, setInputValue] = useState("");
	const [isEditing, setIsEditing] = useState(false);

	// Sync isEditing state when apiKey loads from localStorage
	useEffect(() => {
		setIsEditing(!apiKey);
	}, [apiKey]);

	function handleSave() {
		if (inputValue.trim()) {
			setApiKey(inputValue.trim());
			setIsEditing(false);
			setInputValue("");
		}
	}

	// Update isEditing when apiKey changes (e.g., after loadFromLocalStorage)
	const handleEdit = () => {
		setIsEditing(true);
		setInputValue("");
	};

	const handleRemove = () => {
		clearApiKey();
		setIsEditing(true);
		setInputValue("");
	};

	if (!isEditing && apiKey) {
		return (
			<div className="flex items-center gap-2 p-4 border-b border-white/20">
				<span className="text-green-400">● API Key Active</span>
				<button
					onClick={handleEdit}
					className="px-3 py-1 border border-white/20 hover:bg-white/10 transition-colors"
				>
					Edit
				</button>
				<button
					onClick={handleRemove}
					className="px-3 py-1 border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors"
				>
					Remove
				</button>
			</div>
		);
	}

	return (
		<div className="p-4 border-b border-white/20">
			<div className="flex flex-col gap-2">
				<label className="text-sm text-white/70">Anthropic API Key</label>
				<div className="flex gap-2">
					<input
						type="password"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSave()}
						placeholder="sk-ant-..."
						className="flex-1 px-3 py-2 bg-black border border-white/20 focus:border-white/50 focus:outline-none"
					/>
					<button
						onClick={handleSave}
						disabled={!inputValue.trim()}
						className="px-4 py-2 bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/50 disabled:cursor-not-allowed transition-colors"
					>
						Save
					</button>
				</div>
				<p className="text-xs text-white/50">
					Your API key is stored locally in your browser
				</p>
			</div>
		</div>
	);
}
