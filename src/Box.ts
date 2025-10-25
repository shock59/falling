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

  grabbedEvent: ((event: MouseEvent) => void) | undefined = undefined;
  grabOffsetX: number = 0;
  grabOffsetY: number = 0;

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
    this.div.style.backgroundColor = color;
    this.fullAnimate();

    this.div.addEventListener("mousedown", (event) => {
      this.div.classList.add("grabbed");
      this.grabOffsetX =
        (event.x - this.x * this.manager.drawRatio - this.manager.leftOffset) /
        this.manager.drawRatio;
      this.grabOffsetY =
        (event.y - this.y * this.manager.drawRatio - this.manager.topOffset) /
        this.manager.drawRatio;
      console.log(this.grabOffsetX);
      this.grabbedEvent = (event) => this.drag(event);
      document.addEventListener("mousemove", this.grabbedEvent);
    });
    document.addEventListener("mouseup", () => {
      if (this.grabbedEvent == undefined) return;
      this.div.classList.remove("grabbed");
      document.removeEventListener("mousemove", this.grabbedEvent);
      this.grabbedEvent = undefined;
      this.gravity = 0;
    });

    const body = document.querySelector<HTMLDivElement>("body")!;
    body.appendChild(this.div);
  }

  animate() {
    this.div.style.left = `${
      (this.x - this.width / 2) * this.manager.drawRatio +
      this.manager.leftOffset
    }px`;
    this.div.style.top = `${
      (this.y - this.height / 2) * this.manager.drawRatio +
      this.manager.topOffset
    }px`;
  }

  fullAnimate() {
    this.div.style.width = `${this.width * this.manager.drawRatio}px`;
    this.div.style.height = `${this.height * this.manager.drawRatio}px`;
    this.animate();
  }

  physics(floor: Box | undefined = undefined): void {
    if (this.grabbedEvent != undefined) return;
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

  drag(event: MouseEvent) {
    this.x =
      (event.x - this.manager.leftOffset) / this.manager.drawRatio -
      this.grabOffsetX;
    this.y =
      (event.y - this.manager.topOffset) / this.manager.drawRatio -
      this.grabOffsetY;
    this.animate();
  }
}
