import { LayoutContainer, Text as LayoutText } from "@pixi/layout/components";

export class NameContainer extends LayoutContainer {
	constructor(name: string) {
		super({
			layout: {
				position: "absolute",
				alignSelf: "flex-start",
				marginBottom: 5,
				padding: 5,
				left: 180,
				top: -20,
			},
		});

		const nameText = new LayoutText({
			text: name,
			style: {
				fontSize: 36,
				fontWeight: "bold",
				fill: 0xffffff,
				stroke: {
					width: 6,
					color: 0x000000,
					alignment: 0.5,
					join: "round",
				},

				fontFamily: "quicksand",
			},
			layout: {},
		});

		this.addChild(nameText);
	}
}
