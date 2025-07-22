import "./style.css";
import "@pixi/layout";
import { Application, Assets, TilingSprite } from "pixi.js";
import { sound } from "@pixi/sound";
import { SceneManager } from "./scene/SceneManager";
import { ExampleCardScene } from "./scene/card/ExampleCardScene";
import { ExampleWordScene } from "./scene/word/ExampleWordScene";
import { ExampleParticleScene } from "./scene/particle/ExampleParticleScene";
import { GAME_WIDTH, GAME_HEIGHT } from "./Config";

const SceneType = {
	CARD: "card",
	WORD: "word",
	PARTICLE: "particle",
} as const;

type SceneType = (typeof SceneType)[keyof typeof SceneType];

class GameApplication extends Application {
	private sceneManager!: SceneManager<SceneType>;

	constructor() {
		super();
		this.setupApplication();
	}

	private async setupApplication() {
		await this.init({
			width: GAME_WIDTH,
			height: GAME_HEIGHT,
			resolution: window.devicePixelRatio,
			antialias: true,
		});

		const appDiv = document.querySelector<HTMLDivElement>("#app")!;
		appDiv.appendChild(this.canvas);

		this.stage.layout = {
			width: GAME_WIDTH,
			height: GAME_HEIGHT,
		};

		await Assets.load({
			alias: "monospace",
			src: "fonts/monospace.ttf",
			loadParser: "loadWebFont",
		});

		await Assets.load({
			alias: "quicksand",
			src: "fonts/quicksand.ttf",
			loadParser: "loadWebFont",
		});

		await Assets.load({
			alias: "card",
			src: "textures/card.png",
		});

		sound.add("ui", "sfx/ui.ogg");
		sound.add("card", "sfx/card.ogg");

		const texture = await Assets.load("textures/pattern.png");
		const tilingSprite = new TilingSprite({
			texture,
			width: GAME_WIDTH,
			height: GAME_HEIGHT,
		});
		this.stage.addChild(tilingSprite);

		this.sceneManager = new SceneManager<SceneType>(this.stage);

		const cardScene = new ExampleCardScene();
		const wordScene = new ExampleWordScene();
		const particleScene = new ExampleParticleScene();

		this.sceneManager.addScene(SceneType.CARD, cardScene);
		this.sceneManager.addScene(SceneType.WORD, wordScene);
		this.sceneManager.addScene(SceneType.PARTICLE, particleScene);

		await this.sceneManager.initializeScenes();

		this.setupEventListeners();

		this.sceneManager.switchToScene(SceneType.CARD);

		this.ticker.add((ticker) => {
			this.sceneManager.updateScene(ticker.deltaTime);
		});
	}

	private setupEventListeners() {
		window.addEventListener("keydown", (event) => {
			switch (event.key) {
				case "1":
					this.sceneManager.switchToScene(SceneType.CARD);
					break;
				case "2":
					this.sceneManager.switchToScene(SceneType.WORD);
					break;
				case "3":
					this.sceneManager.switchToScene(SceneType.PARTICLE);
					break;
			}
		});
	}
}

const gameApp = new GameApplication();
