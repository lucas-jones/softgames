import { Graphics, Sprite, Texture } from "pixi.js";
import { LayoutContainer } from "@pixi/layout/components";

export class AvatarContainer extends LayoutContainer {
	static IMAGE_SIZE = 128;

	constructor(avatar: Texture | null) {
		super({
			layout: {
				width: AvatarContainer.IMAGE_SIZE,
				height: AvatarContainer.IMAGE_SIZE,
			},
		});

		const background = new Graphics()
			.circle(AvatarContainer.IMAGE_SIZE / 2, AvatarContainer.IMAGE_SIZE / 2, AvatarContainer.IMAGE_SIZE / 2)
			.fill({ color: 0x6495ed, alpha: 0.8 });

		this.addChild(background);

		if (avatar) {
			const mask = new Graphics()
				.circle(AvatarContainer.IMAGE_SIZE / 2, AvatarContainer.IMAGE_SIZE / 2, AvatarContainer.IMAGE_SIZE / 2)
				.fill(0xffffff);

			const avatarSprite = new Sprite(avatar);
			avatarSprite.mask = mask;

			this.addChild(mask, avatarSprite);
		}
	}
}
