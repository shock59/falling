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
  const changebgPopupBackground = document.querySelector<HTMLDivElement>(
    "#changebg-popup-background"
  )!;

  const addboxPopup = document.querySelector<HTMLDivElement>(
    "#addbox-popup-background > .popup"
  )!;
  const changebgPopup = document.querySelector<HTMLDivElement>(
    "#changebg-popup-background > .popup"
  )!;

  addboxPopup.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  changebgPopup.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  const addboxTypeSelect =
    document.querySelector<HTMLSelectElement>("#box-type")!;
  const addboxWidthInput =
    document.querySelector<HTMLInputElement>("#box-width")!;
  const addboxHeightInput =
    document.querySelector<HTMLSelectElement>("#box-height")!;
  const addboxGravityInput =
    document.querySelector<HTMLSelectElement>("#box-gravity")!;
  const addboxColorSelect = document.querySelector<HTMLSelectElement>("#color")!;
  const addBoxButton =
    document.querySelector<HTMLButtonElement>("#add-box")!;
  
  const addboxHexcodeOptions = document.querySelector<HTMLDivElement>(
    "#popupoptions-hexcode"
  )!;

  const updateHexcodeOptionsVisibility = () => {
    if (addboxColorSelect.value == "custom")
      addboxHexcodeOptions.classList.remove("hidden");
    else addboxHexcodeOptions.classList.add("hidden");
  };

  addboxTypeSelect.addEventListener("change", () => {
    for (const div of addboxPopup.querySelectorAll<HTMLDivElement>(".popupoptions")) {
      if (div.id == `popupoptions-${addboxTypeSelect.value}`)
        div.classList.remove("hidden");
      else div.classList.add("hidden");
    }
    if (addboxTypeSelect.value == "basic") updateHexcodeOptionsVisibility();
    else addboxHexcodeOptions.classList.add("hidden");
  });
  addboxColorSelect.addEventListener("change", updateHexcodeOptionsVisibility);

  addBoxButton.addEventListener("click", () => {
    let widget: Element | undefined;

    switch (addboxTypeSelect.value) {
      case "basic":
        boxManager.addBox(
          Number(addboxWidthInput.value),
          Number(addboxHeightInput.value),
          undefined,
          0,
          Number(addboxGravityInput.value),
          addboxColorSelect.value == "custom"
            ? `#${
                addboxHexcodeOptions.querySelector<HTMLInputElement>("#hex-code")!
                  .value
              }`
            : addboxColorSelect.value
        );
        break;

      case "image":
        const src = document.querySelector<HTMLInputElement>("#image-src")!;
        widget = imageWidget(src.value);
        break;

      case "youtube":
        const videoId =
          document.querySelector<HTMLInputElement>("#youtube-id")!;
        const autoplay =
          document.querySelector<HTMLInputElement>("#youtube-autoplay")!;
        const muted =
          document.querySelector<HTMLInputElement>("#youtube-muted")!;
        const controls =
          document.querySelector<HTMLInputElement>("#youtube-controls")!;
        const captions =
          document.querySelector<HTMLInputElement>("#youtube-captions")!;
        widget = youtubeWidget(videoId.value, {
          autoplay: autoplay.checked,
          muted: muted.checked,
          controls: controls.checked,
          captions: captions.checked,
        });
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
        Number(addboxWidthInput.value),
        Number(addboxHeightInput.value),
        undefined,
        0,
        Number(addboxGravityInput.value),
        "gray",
        [widget]
      );
    }

    addboxPopupBackground.classList.add("hidden");
  });

  const custombgEnable =
    document.querySelector<HTMLInputElement>("#bg-enable")!;
  const custombgSrc = document.querySelector<HTMLInputElement>("#bg-src")!;
  const custombgUpdateButton =
    document.querySelector<HTMLButtonElement>("#bg-update")!;

  custombgUpdateButton.addEventListener("click", () => {
    boxManager.updateBackground(custombgEnable.checked, custombgSrc.value);
    changebgPopupBackground.classList.add("hidden");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      for (const popupBackground of popupBackgrounds) {
        popupBackground.classList.add("hidden");
      }
      addboxPopupBackground.classList.remove("hidden");
    } else if (event.key == "b") {
      for (const popupBackground of popupBackgrounds) {
        popupBackground.classList.add("hidden");
      }
      changebgPopupBackground.classList.remove("hidden");
    } else if (event.key == "Escape") {
      for (const popupBackground of popupBackgrounds) {
        popupBackground.classList.add("hidden");
      }
    }
  });
}
