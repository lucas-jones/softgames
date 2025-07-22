import { Assets, FederatedPointerEvent, Graphics } from "pixi.js";
import { FX, ParticleEmitter } from "revolt-fx";
import { GAME_HEIGHT, GAME_WIDTH } from "../../Config";
import { Scene } from "../Scene";

export class ExampleParticleScene extends Scene {
	private fx: FX;
	private emitter!: ParticleEmitter;

	constructor() {
		super();
		this.fx = new FX();

		const backgroundGraphics = new Graphics().rect(0, 0, GAME_WIDTH, GAME_HEIGHT).fill({ color: 0x000000, alpha: 0.01 });

		this.addChild(backgroundGraphics);

		this.eventMode = "static";
		backgroundGraphics.eventMode = "static";

		this.on("pointermove", this.onPointerMove.bind(this));
		backgroundGraphics.on("pointermove", this.onPointerMove.bind(this));
	}

	async initialize() {
		Assets.add({ alias: "fx_settings", src: "particles/default-bundle.json", loadParser: "loadJSON" });
		Assets.add({ alias: "fx_spritesheet", src: "particles/revoltfx-spritesheet.json", loadParser: "loadJSON" });

		const data = await Assets.load(["fx_settings", "fx_spritesheet"]);

		this.fx.initBundle(data.fx_settings);
		this.emitter = this.fx.getParticleEmitter("side-torch");
		this.emitter.init(this);

		this.emitter.x = GAME_WIDTH / 2;
		this.emitter.y = GAME_HEIGHT / 2;
	}

	onPointerMove(event: FederatedPointerEvent): void {
		this.emitter.x = event.global.x;
		this.emitter.y = event.global.y;
	}

	updateScene(deltaTime: number): void {
		this.fx.update(deltaTime);
	}
}
