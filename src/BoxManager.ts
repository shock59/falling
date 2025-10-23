import Box from "./Box";

type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export default class BoxManager {
  boxes: Box[] = [];
  delta: number;
  lastFrameTime: number;

  constructor() {
    this.lastFrameTime = Date.now();
    this.delta = 0;
    this.onFrame();
  }

  onFrame() {
    const now = Date.now();
    this.delta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    console.log(this.delta);

    for (const box of this.boxes) {
      box.physics();
      box.animate();
    }

    requestAnimationFrame(() => this.onFrame());
  }

  addBox(...parameters: DropFirst<ConstructorParameters<typeof Box>>) {
    this.boxes.push(new Box(this, ...parameters));
  }
}
