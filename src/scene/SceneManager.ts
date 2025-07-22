import { Container } from "pixi.js";
import { Scene } from "./Scene";

export class SceneManager<T extends string | number | symbol> {
	private scenes: Map<T, Scene> = new Map();
	private currentScene: Scene | null = null;
	private stage: Container;

	constructor(stage: Container) {
		this.stage = stage;
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
			this.stage.removeChild(this.currentScene);
		}

		this.currentScene = newScene;
		this.stage.addChild(this.currentScene);

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
