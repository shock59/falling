import BoxManager from "./BoxManager";
import "./style.css";
import wikipediaWidget from "./widgets/wikipediaWidget";

const boxManager = new BoxManager(1280, 720);

const div = document.createElement("div");
div.style.color = "#000000";
div.style.fontSize = "22px";
div.style.height = "100%";
div.style.display = "flex";
div.style.justifyContent = "center";
div.style.alignItems = "center";
div.innerText = "Floor";
boxManager.addBox(800, 50, undefined, 620, 0, "white", [div]);

boxManager.addBox(400, 350, undefined, 0, 0.08, "white", [
  wikipediaWidget("https://en.wikipedia.org/wiki/Australia"),
]);

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
