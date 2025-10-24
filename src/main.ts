import BoxManager from "./BoxManager";
import "./style.css";

const boxManager = new BoxManager(1280, 720);
boxManager.addBox(200, 50, undefined, 0, 0.05, "magenta");
boxManager.addBox(800, 50, undefined, 620, 0, "white");

const colors = [
  "DeepPink",
  "Red",
  "Orange",
  "Gold",
  "Fuchsia",
  "Lime",
  "Turquoise",
  "DodgerBlue",
  "BlueViolet",
];

document.addEventListener("keydown", (event) => {
  if (event.key != " ") return;
  boxManager.addBox(
    200,
    50,
    undefined,
    0,
    0.05,
    colors[Math.floor(Math.random() * colors.length)]
  );
});
