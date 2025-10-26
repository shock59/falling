import BoxManager from "./BoxManager";
import "./style.css";
import audioWidget from "./widgets/audioWidget";
import imageWidget from "./widgets/imageWidget";
import wikipediaWidget from "./widgets/wikipediaWidget";
import youtubeWidget from "./widgets/youtubeWidget";

const boxManager = new BoxManager(1280, 720);

boxManager.addBox(800, 50, undefined, 620, 0, "white");

const popupBackground =
  document.querySelector<HTMLDivElement>("#popup-background")!;
const popup = document.querySelector<HTMLDivElement>("#popup")!;
popupBackground.addEventListener("click", () =>
  popupBackground.classList.add("hidden")
);
popup.addEventListener("click", (event) => {
  event.stopPropagation();
});

const popupBoxTypeSelect =
  document.querySelector<HTMLSelectElement>("#box-type")!;
const popupBoxWidthInput =
  document.querySelector<HTMLInputElement>("#box-width")!;
const popupBoxHeightInput =
  document.querySelector<HTMLSelectElement>("#box-height")!;
const popupBoxGravityInput =
  document.querySelector<HTMLSelectElement>("#box-gravity")!;
const popupAddBoxButton =
  document.querySelector<HTMLButtonElement>("#add-box")!;

popupBoxTypeSelect.addEventListener("change", () => {
  for (const div of popup.querySelectorAll<HTMLDivElement>(".popupoptions")) {
    if (div.id == `popupoptions-${popupBoxTypeSelect.value}`)
      div.classList.remove("hidden");
    else div.classList.add("hidden");
  }
});

popupAddBoxButton.addEventListener("click", () => {
  let widget: Element | undefined;

  switch (popupBoxTypeSelect.value) {
    case "basic":
      const colorSelect = document.querySelector<HTMLSelectElement>("#color")!;
      boxManager.addBox(
        Number(popupBoxWidthInput.value),
        Number(popupBoxHeightInput.value),
        undefined,
        0,
        Number(popupBoxGravityInput.value),
        colorSelect.value
      );
      break;

    case "image":
      const src = document.querySelector<HTMLInputElement>("#image-src")!;
      widget = imageWidget(src.value);
      break;

    case "youtube":
      const videoId = document.querySelector<HTMLInputElement>("#youtube-id")!;
      widget = youtubeWidget(videoId.value);
      break;

    case "audio":
      const audioSrc = document.querySelector<HTMLInputElement>("#audio-src")!;
      widget = audioWidget(audioSrc.value);
      break;

    case "embed":
      const embedSrc = document.querySelector<HTMLInputElement>("#embed-src")!;
      widget = wikipediaWidget(embedSrc.value);
      break;

    case "html":
      const customHtml =
        document.querySelector<HTMLTextAreaElement>("#custom-html")!;
      const div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "100%";
      div.innerHTML = customHtml.value;
      widget = div;
      break;
  }
  if (widget != undefined) {
    boxManager.addBox(
      Number(popupBoxWidthInput.value),
      Number(popupBoxHeightInput.value),
      undefined,
      0,
      Number(popupBoxGravityInput.value),
      "gray",
      [widget]
    );
  }

  popupBackground.classList.add("hidden");
});

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    popupBackground.classList.remove("hidden");
  }
});
