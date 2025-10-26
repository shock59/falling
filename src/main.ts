import BoxManager from "./BoxManager";
import "./style.css";
import audioWidget from "./widgets/audioWidget";

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

boxManager.addBox(400, 50, undefined, 0, 0.08, "darkgray", [
  audioWidget(
    "https://upload.wikimedia.org/wikipedia/commons/f/f3/Anthem_of_Europe_%28US_Navy_instrumental_short_version%29.ogg"
  ),
]);

const popupBackground =
  document.querySelector<HTMLDivElement>("#popup-background")!;
const popup = document.querySelector<HTMLDivElement>("#popup")!;
popupBackground.addEventListener("click", () =>
  popupBackground.classList.add("hidden")
);
popup.addEventListener("click", (event) => {
  event.stopPropagation();
});

const popupBoxColorSelect =
  document.querySelector<HTMLSelectElement>("#color")!;
const popupAddBoxButton =
  document.querySelector<HTMLButtonElement>("#add-box")!;
popupAddBoxButton.addEventListener("click", () => {
  boxManager.addBox(200, 50, undefined, 0, 0.05, popupBoxColorSelect.value);
  popupBackground.classList.add("hidden");
});

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    popupBackground.classList.remove("hidden");
  }
});
