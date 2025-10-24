import type BoxManager from "./BoxManager";

export default class Box {
  div: HTMLDivElement;

  manager: BoxManager;
  width: number;
  height: number;
  gravityScale: number;

  x: number;
  y: number;
  gravity: number = 0;

  constructor(
    manager: BoxManager,
    width: number,
    height: number,
    x: number | undefined,
    y: number,
    gravityScale: number,
    color: string
  ) {
    this.manager = manager;
    this.width = width;
    this.height = height;
    this.gravityScale = gravityScale;

    this.x = x ?? manager.stageWidth / 2;
    this.y = y;

    this.div = document.createElement("div");
    this.div.classList.add("box");
    this.div.style.width = `${this.width}px`;
    this.div.style.height = `${this.height}px`;
    this.div.style.backgroundColor = color;
    this.animate();
    const body = document.querySelector<HTMLDivElement>("body")!;
    body.appendChild(this.div);
  }

  animate() {
    this.div.style.left = `${this.x - this.width / 2}px`;
    this.div.style.top = `${this.y - this.height / 2}px`;
  }

  physics(floor: Box | undefined = undefined): void {
    if (!floor) floor = this.manager.touchingFloor(this);
    if (floor) {
      this.gravity = floor.gravity;
      this.y = floor.y - floor.height / 2 - this.height / 2;
    } else {
      this.gravity -= this.gravityScale * this.manager.delta;
      let distanceToMove = this.gravity;
      while (-distanceToMove > this.height / 2) {
        this.y += this.height / 2;
        distanceToMove += this.height / 2;
        if (this.manager.touchingFloor(this)) return this.physics(floor);
      }
      this.y -= distanceToMove;
    }
  }
}
