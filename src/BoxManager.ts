import Box from "./Box";

type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export default class BoxManager {
  stageWidth: number;
  stageHeight: number;
  drawRatio!: number;
  leftOffset!: number;
  topOffset!: number;

  bars: { [k in "left" | "right" | "top" | "bottom"]: HTMLDivElement };

  boxes: Box[] = [];
  delta: number;
  lastFrameTime: number;

  constructor(
    stageWidth: number | undefined = undefined,
    stageHeight: number | undefined = undefined
  ) {
    this.stageWidth = stageWidth ?? window.innerWidth;
    this.stageHeight = stageHeight ?? window.innerHeight;
    this.lastFrameTime = Date.now();
    this.delta = 0;

    const body = document.querySelector<HTMLDivElement>("body")!;
    this.bars = Object.fromEntries(
      (["left", "right", "top", "bottom"] as (keyof BoxManager["bars"])[]).map(
        (barPosition) => {
          const bar = document.createElement("div");
          bar.classList.add("bar");
          bar.style[barPosition] = "0";
          if (["left", "right"].includes(barPosition)) bar.style.top = "0";
          return [barPosition, bar];
        }
      )
    ) as { [k in keyof BoxManager["bars"]]: HTMLDivElement };
    for (const div of Object.values(this.bars)) {
      body.appendChild(div);
    }

    this.updateDrawRatios();
    window.addEventListener("resize", () => this.updateDrawRatios());
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
        (boxXCorners[0] <= otherXCorners[0] &&
          boxXCorners[1] >= otherXCorners[0]) ||
        (boxXCorners[0] <= otherXCorners[1] &&
          boxXCorners[1] >= otherXCorners[1]) ||
        (boxXCorners[0] >= otherXCorners[0] &&
          boxXCorners[1] < otherXCorners[1])
      ) {
        return other;
      }
    }

    return undefined;
  }

  updateDrawRatios() {
    const widthRatio = window.innerWidth / this.stageWidth;
    const heightRatio = window.innerHeight / this.stageHeight;
    this.drawRatio = Math.min(widthRatio, heightRatio);

    const backgroundWidth =
      this.drawRatio == widthRatio
        ? window.innerWidth
        : window.innerHeight * (this.stageWidth / this.stageHeight);
    this.leftOffset = (window.innerWidth - backgroundWidth) / 2;
    const backgroundHeight =
      this.drawRatio == widthRatio
        ? window.innerWidth * (this.stageHeight / this.stageWidth)
        : window.innerHeight;
    this.topOffset = (window.innerHeight - backgroundHeight) / 2;

    for (const barPosition of Object.keys(
      this.bars
    ) as (keyof BoxManager["bars"])[]) {
      const bar = this.bars[barPosition];
      bar.style.width = ["left", "right"].includes(barPosition)
        ? `${this.leftOffset}px`
        : `${window.innerWidth}px`;
      bar.style.height = ["top", "bottom"].includes(barPosition)
        ? `${this.topOffset}px`
        : `${window.innerHeight}px`;
    }

    for (const box of this.boxes) box.fullAnimate();
  }

  addBox(...parameters: DropFirst<ConstructorParameters<typeof Box>>) {
    this.boxes.push(new Box(this, ...parameters));
  }
}
