export type TextElement = { type: "text"; value: string } | { type: "emoji"; value: string };

export function parseText(text: string): TextElement[] {
	const elements: TextElement[] = [];
	const regex = /\{([^}]+)\}|([^{}]+)/g;
	let match;

	while ((match = regex.exec(text)) !== null) {
		const emojiName = match[1];
		const textContent = match[2];

		if (emojiName) {
			elements.push({ type: "emoji", value: emojiName });
		} else if (textContent) {
			elements.push({ type: "text", value: textContent });
		}
	}

	return elements;
}
