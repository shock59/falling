import "./style.css";

const BODY = document.querySelector<HTMLDivElement>("body")!;

function createBox(width: number, height: number) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.style.width = `${width}px`;
  box.style.height = `${height}px`;
  box.style.left = `${(window.innerWidth - width) / 2}px`;
  box.style.top = "0px";
  BODY.appendChild(box);
  return box;
}

createBox(200, 50);
