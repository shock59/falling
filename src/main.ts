import "./style.css";

const BODY = document.querySelector<HTMLDivElement>("body")!;

class Box {
  div: HTMLDivElement;

  width: number;
  height: number;
  gravityScale: number;

  x: number;
  y: number;
  gravity: number = 0;

  constructor(width: number, height: number, gravityScale: number) {
    this.width = width;
    this.height = height;
    this.gravityScale = gravityScale;

    this.x = (window.innerWidth - this.width) / 2;
    this.y = 0;

    this.div = document.createElement("div");
    this.div.classList.add("box");
    this.div.style.width = `${this.width}px`;
    this.div.style.height = `${this.height}px`;
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

function animate(box: Box) {
  box.physics();
  box.animate();
  requestAnimationFrame(() => animate(box));
}

const box = new Box(200, 50, 0.3);
animate(box);
