import type BoxManager from "./BoxManager";
import audioWidget from "./widgets/audioWidget";
import imageWidget from "./widgets/imageWidget";
import embedWidget from "./widgets/embedWidget";
import youtubeWidget from "./widgets/youtubeWidget";

export default function setUpPopup(boxManager: BoxManager) {
  const popupBackgrounds =
    document.querySelectorAll<HTMLDivElement>(".popup-background")!;
  for (let popupBackground of popupBackgrounds)
    popupBackground.addEventListener("click", () =>
      popupBackground.classList.add("hidden")
    );

  const addboxPopupBackground = document.querySelector<HTMLDivElement>(
    "#addbox-popup-background"
  )!;
  const popup = document.querySelector<HTMLDivElement>(
    "#addbox-popup-background > .popup"
  )!;

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
  const colorSelect = document.querySelector<HTMLSelectElement>("#color")!;
  const popupAddBoxButton =
    document.querySelector<HTMLButtonElement>("#add-box")!;
  const hexcodeOptions = document.querySelector<HTMLDivElement>(
    "#popupoptions-hexcode"
  )!;

  const updateHexcodeOptionsVisibility = () => {
    if (colorSelect.value == "custom")
      hexcodeOptions.classList.remove("hidden");
    else hexcodeOptions.classList.add("hidden");
  };

  popupBoxTypeSelect.addEventListener("change", () => {
    for (const div of popup.querySelectorAll<HTMLDivElement>(".popupoptions")) {
      if (div.id == `popupoptions-${popupBoxTypeSelect.value}`)
        div.classList.remove("hidden");
      else div.classList.add("hidden");
    }
    if (popupBoxTypeSelect.value == "basic") updateHexcodeOptionsVisibility();
    else hexcodeOptions.classList.add("hidden");
  });
  colorSelect.addEventListener("change", updateHexcodeOptionsVisibility);

  popupAddBoxButton.addEventListener("click", () => {
    let widget: Element | undefined;

    switch (popupBoxTypeSelect.value) {
      case "basic":
        boxManager.addBox(
          Number(popupBoxWidthInput.value),
          Number(popupBoxHeightInput.value),
          undefined,
          0,
          Number(popupBoxGravityInput.value),
          colorSelect.value == "custom"
            ? `#${
                hexcodeOptions.querySelector<HTMLInputElement>("#hex-code")!
                  .value
              }`
            : colorSelect.value
        );
        break;

      case "image":
        const src = document.querySelector<HTMLInputElement>("#image-src")!;
        widget = imageWidget(src.value);
        break;

      case "youtube":
        const videoId =
          document.querySelector<HTMLInputElement>("#youtube-id")!;
        widget = youtubeWidget(videoId.value);
        break;

      case "audio":
        const audioSrc =
          document.querySelector<HTMLInputElement>("#audio-src")!;
        widget = audioWidget(audioSrc.value);
        break;

      case "embed":
        const embedSrc =
          document.querySelector<HTMLInputElement>("#embed-src")!;
        widget = embedWidget(embedSrc.value);
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

    addboxPopupBackground.classList.add("hidden");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      addboxPopupBackground.classList.remove("hidden");
    } else if (event.key == "Escape") {
      for (const popupBackground of popupBackgrounds) {
        popupBackground.classList.add("hidden");
      }
    }
  });
}
