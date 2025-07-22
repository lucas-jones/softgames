import { Texture, Assets } from "pixi.js";
import type { Emoji } from "../services/MagicWordsAPI";

export class EmojiStore {
	private emojiData: Map<string, Texture> = new Map();

	async load(emojies: Emoji[]) {
		const emojiPromises = emojies.map(async (emoji) => {
			const texture = await Assets.load({
				src: emoji.url,
				loadParser: "loadTextures",
			});
			this.emojiData.set(emoji.name, texture);
		});

		await Promise.all(emojiPromises);
	}

	getEmoji(name: string): Texture | null {
		return this.emojiData.get(name) || null;
	}
}
