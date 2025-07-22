import { Assets, Sprite } from "pixi.js";
import { Spring } from "../utils/Spring";

export class Card extends Sprite {
	public springX: Spring;
	public springY: Spring;
	public springRotation: Spring;
	public deckIndex: number = 0;

	constructor() {
		super(Assets.get("card"));
		this.springX = new Spring(0.3, 0.6);
		this.springY = new Spring(0.3, 0.6);
		this.springRotation = new Spring(0.1, 0.9);

		this.anchor.set(0.5, 0.5);
	}

	update(deltaTime: number): void {
		this.springX.update(deltaTime);
		this.springY.update(deltaTime);
		this.springRotation.update(deltaTime);

		this.x = this.springX.value;
		this.y = this.springY.value;
		this.rotation = this.springRotation.value;
	}

	animateTo(x: number, y: number, rotation: number = 0): void {
		this.springX.setTarget(x);
		this.springY.setTarget(y);
		this.springRotation.setTarget(rotation);
	}
}
