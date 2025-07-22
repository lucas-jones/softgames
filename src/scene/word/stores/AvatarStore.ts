import { Texture, Assets } from "pixi.js";
import type { Avatar } from "../services/MagicWordsAPI";

export class AvatarStore {
	private avatarData: Map<string, { position: string; texture: Texture }> = new Map();

	async load(avatars: Avatar[]) {
		const avatarPromises = avatars.map(async (avatar) => {
			try {
				const texture = await Assets.load({
					alias: `avatar-${avatar.name}`,
					src: avatar.url,
					loadParser: "loadTextures",
				});
				this.avatarData.set(avatar.name, {
					position: avatar.position,
					texture,
				});
			} catch (error) {
				console.warn(`Failed to load avatar ${avatar.name} from ${avatar.url}:`, error);
				// Use a fallback texture (white texture)
				this.avatarData.set(avatar.name, {
					position: avatar.position,
					texture: Texture.WHITE,
				});
			}
		});

		await Promise.all(avatarPromises);
	}

	getAvatar(name: string): { position: string; texture: Texture } | null {
		return this.avatarData.get(name) || null;
	}
}
