import { BODY } from "./constants";

export default class Box {
  div: HTMLDivElement;

  width: number;
  height: number;
  gravityScale: number;

  x: number;
  y: number;
  gravity: number = 0;

  constructor(
    width: number,
    height: number,
    gravityScale: number,
    color: string
  ) {
    this.width = width;
    this.height = height;
    this.gravityScale = gravityScale;

    this.x = (window.innerWidth - this.width) / 2;
    this.y = 0;

    this.div = document.createElement("div");
    this.div.classList.add("box");
    this.div.style.width = `${this.width}px`;
    this.div.style.height = `${this.height}px`;
    this.div.style.backgroundColor = color;
    this.animate();
    BODY.appendChild(this.div);
  }

  animate() {
    this.div.style.left = `${this.x}px`;
    this.div.style.top = `${this.y}px`;
  }

  physics() {
    this.gravity -= this.gravityScale;
    this.y -= this.gravity;
  }
}
