import { Container } from "pixi.js";
import { Scene } from "./Scene";
import { LayoutContainer } from "@pixi/layout/components";
import { GAME_HEIGHT, GAME_WIDTH } from "../Config";

export class SceneManager<T extends string | number | symbol> extends LayoutContainer {
	private scenes: Map<T, Scene> = new Map();
	private currentScene: Scene | null = null;

	constructor() {
		super();
		this.layout = {
			width: GAME_WIDTH,
			height: GAME_HEIGHT,
		};
	}

	public addScene(sceneType: T, scene: Scene): void {
		this.scenes.set(sceneType, scene);
	}

	public async initializeScenes(): Promise<void> {
		const scenePromises = Array.from(this.scenes.values()).map((scene) => scene.initialize());
		await Promise.all(scenePromises);
	}

	public switchToScene(sceneType: T): void {
		const newScene = this.scenes.get(sceneType);
		if (!newScene) return;

		if (this.currentScene) {
			this.removeChild(this.currentScene);
		}

		this.currentScene = newScene;
		this.addChild(this.currentScene);

		console.log(`Switched to ${this.currentScene.name} Scene`);
	}

	public getCurrentScene(): Scene | null {
		return this.currentScene;
	}

	public updateScene(deltaTime: number): void {
		if (this.currentScene) {
			this.currentScene.updateScene(deltaTime);
		}
	}
}
