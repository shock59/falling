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

    for (const box of this.boxes) {
      if (box.gravityScale == 0) continue;
      box.physics();
      box.animate();
    }

    requestAnimationFrame(() => this.onFrame());
  }

  touchingFloor(box: Box) {
    const boxXCorners = [box.x - box.width / 2, box.x + box.width / 2];
    const boxBottomY = box.y + box.height / 2;

    for (const other of this.boxes) {
      if (other === box) continue;

      const otherXCorners = [
        other.x - other.width / 2,
        other.x + other.width / 2,
      ];
      const otherTopY = other.y - other.height / 2;
      const otherBottomY = other.y + other.height / 2;

      if (boxBottomY < otherTopY || boxBottomY >= otherBottomY) continue;
      if (
        (boxXCorners[0] < otherXCorners[0] &&
          boxXCorners[1] > otherXCorners[0]) ||
        (boxXCorners[0] < otherXCorners[1] &&
          boxXCorners[1] > otherXCorners[1]) ||
        (boxXCorners[0] > otherXCorners[0] && boxXCorners[1] < otherXCorners[1])
      ) {
        return other;
      }
    }

    return undefined;
  }

  addBox(...parameters: DropFirst<ConstructorParameters<typeof Box>>) {
    this.boxes.push(new Box(this, ...parameters));
  }
}
