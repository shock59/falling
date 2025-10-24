import BoxManager from "./BoxManager";
import "./style.css";

const boxManager = new BoxManager();
boxManager.addBox(200, 50, undefined, 0, 0.05, "magenta");
boxManager.addBox(800, 50, undefined, 500, 0, "white");
