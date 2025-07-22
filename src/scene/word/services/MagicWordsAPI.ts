export interface DialogueItem {
	name: string;
	text: string;
}

export interface Emoji {
	name: string;
	url: string;
}

export interface Avatar {
	name: string;
	url: string;
	position: string;
}

export interface MagicWordsResponse {
	dialogue: DialogueItem[];
	emojies: Emoji[];
	avatars: Avatar[];
}

export class MagicWordsAPI {
	private static readonly API_URL = "https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords";

	/**
	 * Fetches magic words data from the API
	 * @returns Promise<MagicWordsResponse> The API response with dialogue, emojies, and avatars
	 * @throws Error if the API request fails
	 */
	static async fetchMagicWords(): Promise<MagicWordsResponse> {
		try {
			const response = await fetch(this.API_URL);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error("Failed to fetch magic words from API:", error);
			throw error;
		}
	}
}
