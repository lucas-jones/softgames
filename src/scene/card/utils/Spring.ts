export class Spring {
	public value: number = 0;
	public target: number = 0;
	public velocity: number = 0;
	private stiffness: number;
	private damping: number;

	constructor(stiffness: number = 0.2, damping: number = 0.8) {
		this.stiffness = stiffness;
		this.damping = damping;
	}

	update(deltaTime: number): void {
		const force = (this.target - this.value) * this.stiffness;
		this.velocity += force * deltaTime;
		this.velocity *= this.damping;
		this.value += this.velocity * deltaTime;
	}

	setTarget(target: number): void {
		this.target = target;
	}

	isAtRest(): boolean {
		return Math.abs(this.velocity) < 0.1 && Math.abs(this.target - this.value) < 1;
	}
}
