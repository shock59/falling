import BoxManager from "./BoxManager";
import "./style.css";

const boxManager = new BoxManager();
boxManager.addBox(200, 50, 0.3, "magenta");
boxManager.onFrame();
