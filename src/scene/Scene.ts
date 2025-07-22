import { LayoutContainer } from "@pixi/layout/components";

export abstract class Scene extends LayoutContainer {
	constructor() {
		super({
			layout: {
				width: "100%",
				height: "100%",
			},
		});
	}

	abstract initialize(): Promise<void>;

	updateScene(deltaTime: number): void {}
}
