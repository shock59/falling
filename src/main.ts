import "./style.css";

const BODY = document.querySelector<HTMLDivElement>("body")!;

class Box {
  div: HTMLDivElement;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.div = document.createElement("div");
    this.div.classList.add("box");
    this.div.style.width = `${width}px`;
    this.div.style.height = `${height}px`;
    BODY.appendChild(this.div);
  }

  animate() {
    this.div.style.left = `${(window.innerWidth - this.width) / 2}px`;
    this.div.style.top = "0px";
  }
}

function animate(box: Box) {
  box.animate();
  requestAnimationFrame(() => animate(box));
}

const box = new Box(200, 50);
animate(box);
