import Box from "./Box";

export default class BoxManager {
  boxes: Box[] = [];

  onFrame() {
    for (const box of this.boxes) {
      box.physics();
      box.animate();
    }

    requestAnimationFrame(() => this.onFrame());
  }

  addBox(...parameters: ConstructorParameters<typeof Box>) {
    this.boxes.push(new Box(...parameters));
  }
}
