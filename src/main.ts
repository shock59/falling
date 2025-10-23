import Box from "./Box";
import "./style.css";

function animate(box: Box) {
  box.physics();
  box.animate();
  requestAnimationFrame(() => animate(box));
}

const box = new Box(200, 50, 0.3, "magenta");
animate(box);
