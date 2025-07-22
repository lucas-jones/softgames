import { Graphics } from "pixi.js";
import { sound } from "@pixi/sound";
import { Scene } from "../Scene";
import { Card } from "./components/Card";
import { SwirlingShaderFilter } from "./components/SwirlingShaderFilter";
import { GAME_WIDTH, GAME_HEIGHT } from "../../Config";

export class ExampleCardScene extends Scene {
	private backgroundGraphics!: Graphics;
	private shaderFilter!: SwirlingShaderFilter;
	private startTime!: number;
	private cards: Card[] = [];
	private spawnTimer: number = 0;
	private currentCardIndex: number = 0;
	private deckPositions: { x: number; y: number }[] = [];
	private lastSoundTime: number = 0;
	private static readonly SOUND_DEBOUNCE_MS = 80;

	private static readonly CENTER_X = GAME_WIDTH / 2;
	private static readonly CENTER_Y = GAME_HEIGHT / 2;

	private static readonly TOTAL_CARDS = 144;
	private static readonly SPAWN_INTERVAL = 15;

	constructor() {
		super();
	}

	async initialize() {
		this.createBackgroundShader();
		this.startTime = performance.now();

		this.setupDeckPositions();

		this.createCards();
	}

	private createBackgroundShader() {
		this.backgroundGraphics = new Graphics().rect(0, 0, GAME_WIDTH, GAME_HEIGHT).fill({ color: 0xffffff });

		this.shaderFilter = new SwirlingShaderFilter();
		this.shaderFilter.resolution = devicePixelRatio;
		this.backgroundGraphics.filters = [this.shaderFilter];

		this.addChild(this.backgroundGraphics);
	}

	private setupDeckPositions(): void {
		const deckSpacing = GAME_WIDTH / 4;

		this.deckPositions.push({
			x: deckSpacing,
			y: ExampleCardScene.CENTER_Y,
		});

		this.deckPositions.push({
			x: ExampleCardScene.CENTER_X,
			y: ExampleCardScene.CENTER_Y,
		});

		this.deckPositions.push({
			x: GAME_WIDTH - deckSpacing,
			y: ExampleCardScene.CENTER_Y,
		});
	}

	private createCards(): void {
		for (let i = 0; i < ExampleCardScene.TOTAL_CARDS; i++) {
			const card = new Card();

			const spawnX = ExampleCardScene.CENTER_X;
			const spawnY = GAME_HEIGHT - 100;

			card.springX.value = spawnX;
			card.springY.value = spawnY;
			card.springX.target = spawnX;
			card.springY.target = spawnY;
			card.x = spawnX;
			card.y = spawnY;

			card.deckIndex = i % 3;

			card.alpha = 0;

			this.cards.push(card);
			this.addChild(card);
		}
	}

	private spawnNextCard(): void {
		if (this.currentCardIndex >= ExampleCardScene.TOTAL_CARDS) return;

		const card = this.cards[this.currentCardIndex];
		const deckPos = this.deckPositions[card.deckIndex];

		const currentTime = performance.now();
		if (currentTime - this.lastSoundTime >= ExampleCardScene.SOUND_DEBOUNCE_MS) {
			const soundName = "card";
			sound.play(soundName, { volume: 0.3 });
			this.lastSoundTime = currentTime;
		}

		card.alpha = 1;

		const offsetX = (Math.random() - 0.5) * 20;
		const offsetY = (Math.random() - 0.5) * 10;
		const rotation = (Math.random() - 0.5) * 0.1;

		card.animateTo(deckPos.x + offsetX, deckPos.y + offsetY, rotation);

		this.currentCardIndex++;
	}

	updateScene(deltaTime: number): void {
		super.updateScene(deltaTime);

		if (this.shaderFilter) {
			const currentTime = (performance.now() - this.startTime) / 10000.0;
			this.shaderFilter.time = currentTime;
		}

		this.spawnTimer += deltaTime * 16.67;
		if (this.spawnTimer >= ExampleCardScene.SPAWN_INTERVAL) {
			this.spawnNextCard();
			this.spawnTimer = 0;
		}

		for (const card of this.cards) {
			card.update(deltaTime);
		}
	}
}
