import "@pixi/layout";
import { Container } from "pixi.js";
import { sound } from "@pixi/sound";
import { Scene } from "../Scene";
import type { DialogueItem, MagicWordsResponse } from "./services/MagicWordsAPI";
import { MagicWordsAPI } from "./services/MagicWordsAPI";
import { LayoutContainer } from "@pixi/layout/components";
import { AvatarStore } from "./stores/AvatarStore";
import { EmojiStore } from "./stores/EmojiStore";
import { AvatarContainer } from "./components/AvatarContainer";
import { DialogContainer } from "./components/DialogContainer";
import { SpacerContainer } from "./components/SpacerContainer";
import { NameContainer } from "./components/NameContainer";

export class ExampleWordScene extends Scene {
	name = "Word";
	private apiData: MagicWordsResponse | null = null;
	private avatarStore: AvatarStore = new AvatarStore();
	private emojiStore: EmojiStore = new EmojiStore();
	private currentDialogIndex: number = 0;
	private currentDialogContainer: LayoutContainer | Container | null = null;

	constructor() {
		super();
	}

	async initialize() {
		this.apiData = await MagicWordsAPI.fetchMagicWords();
		await this.avatarStore.load(this.apiData.avatars);
		await this.emojiStore.load(this.apiData.emojies);

		this.showNextDialog();
	}

	private showNextDialog() {
		if (!this.apiData) return;

		if (this.currentDialogContainer) {
			this.removeChild(this.currentDialogContainer);
		}

		const dialogueData = this.apiData.dialogue[this.currentDialogIndex] || {
			name: "default",
			text: "No more dialogs - click to restart",
		};

		this.currentDialogContainer = this.createDialog(dialogueData);
		this.addChild(this.currentDialogContainer);

		this.currentDialogIndex++;
		if (this.currentDialogIndex >= this.apiData.dialogue.length) {
			this.currentDialogIndex = 0;
		}
	}

	createDialog(dialogueData: DialogueItem) {
		const avatar = this.avatarStore.getAvatar(dialogueData.name);

		const avatarSprite = new AvatarContainer(avatar ? avatar.texture : null);
		const nameContainer = new NameContainer(dialogueData.name);
		const textContainer = new DialogContainer(dialogueData.text, this.emojiStore);
		const spacer = new SpacerContainer();

		const dialogContainer = new LayoutContainer({
			layout: {
				width: "100%",
				alignSelf: "flex-end",
				flexDirection: "row",
				gap: 20,
				padding: 20,
			},
		});

		dialogContainer.on("pointerdown", () => {
			sound.play("ui", { volume: 0.5 });
			this.showNextDialog();
		});

		if (avatar != null && avatar.position === "right") {
			dialogContainer.addChild(spacer, textContainer, avatarSprite, nameContainer);
		} else {
			dialogContainer.addChild(avatarSprite, textContainer, spacer, nameContainer);
		}

		return dialogContainer;
	}
}
