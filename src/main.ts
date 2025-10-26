import BoxManager from "./BoxManager";
import setUpPopup from "./setUpPopup";
import "./style.css";

const boxManager = new BoxManager(1280, 720);
setUpPopup(boxManager);
boxManager.addBox(800, 50, undefined, 620, 0, "white");
