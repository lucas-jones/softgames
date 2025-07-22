import { LayoutContainer } from "@pixi/layout/components";
import { AvatarContainer } from "./AvatarContainer";

export class SpacerContainer extends LayoutContainer {
	constructor() {
		super({
			layout: {
				width: AvatarContainer.IMAGE_SIZE,
				height: AvatarContainer.IMAGE_SIZE,
			},
		});
	}
}
