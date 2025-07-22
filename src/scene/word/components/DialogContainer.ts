import { LayoutContainer, Text as LayoutText, Sprite as LayoutSprite } from "@pixi/layout/components";
import type { EmojiStore } from "../stores/EmojiStore";
import { parseText } from "../utils/textParser";

export class DialogContainer extends LayoutContainer {
	constructor(text: string, emojiStore: EmojiStore) {
		super({
			layout: {
				flex: 1,
				minHeight: 100,
				padding: 10,
				backgroundColor: 0xfffdd0,
				borderRadius: 10,
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
			},
			interactive: true,
			cursor: "pointer",
		});

		this.populate(text, emojiStore);

		const nextIcon = new LayoutText({
			text: "▼",
			style: {
				fontSize: 18,
				fontWeight: "bold",
				fill: 0x333333,
				fontFamily: "quicksand",
			},
			cursor: "pointer",
			interactive: true,
			layout: {
				position: "absolute",
				bottom: 0,
				right: 0,
				margin: 5,
			},
		});

		this.addChild(nextIcon);
	}

	private populate(text: string, emojiStore: EmojiStore) {
		const elements = parseText(text);

		for (const element of elements) {
			if (element.type === "emoji") {
				const emojiTexture = emojiStore.getEmoji(element.value);
				if (emojiTexture) {
					const emojiSprite = new LayoutSprite({
						texture: emojiTexture,
						layout: {
							width: 24,
							height: 24,
						},
					});
					this.addChild(emojiSprite);
				}
			} else if (element.type === "text") {
				const textPart = new LayoutText({
					text: element.value,
					style: {
						fontSize: 24,
						fontWeight: "bold",
						fill: 0x000000,
						fontFamily: "quicksand",
					},
					layout: {},
				});
				this.addChild(textPart);
			}
		}
	}
}
