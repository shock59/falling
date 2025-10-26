import BoxManager from "./BoxManager";
import setUpPopup from "./setUpPopup";
import "./style.css";
import audioWidget from "./widgets/audioWidget";
import embedWidget from "./widgets/embedWidget";
import imageWidget from "./widgets/imageWidget";
import youtubeWidget from "./widgets/youtubeWidget";

const boxManager = new BoxManager(1280, 720);
setUpPopup(boxManager);
boxManager.addBox(800, 25, undefined, 675, 0, "white");

boxManager.addBox(360, 360 * (9 / 16), 320, 100, 0.18, "Gray", [
  youtubeWidget("E8UmTJVDnUI", {
    captions: true,
  }),
]);
boxManager.addBox(240, 35, 342, -120, 0.12, "Gray", [
  audioWidget(
    "https://upload.wikimedia.org/wikipedia/commons/a/a6/U.S._Navy_Band%2C_Advance_Australia_Fair_%28instrumental%29.ogg"
  ),
]);

boxManager.addBox(450, 360, 775, 400, 0.1, "Gray", [
  embedWidget("https://en.wikipedia.org/wiki/TypeScript"),
]);

boxManager.addBox(320, 320 * (9 / 16), 590, -240, 0.05, "Gray", [
  imageWidget(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/London_-_Flickr_-_Pierre_Blach%C3%A9.jpg/1024px-London_-_Flickr_-_Pierre_Blach%C3%A9.jpg"
  ),
]);

boxManager.addBox(200, 50, 958, 130, 0.05, "DeepPink");
boxManager.addBox(200, 50, 931, 65, 0.05, "Gold");
boxManager.addBox(200, 50, 943, 0, 0.05, "DodgerBlue");
