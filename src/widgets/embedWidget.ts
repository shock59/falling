export default function embedWidget(src: string) {
  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.outline = "1px Gray solid";
  iframe.style.outlineOffset = "-1px";
  iframe.style.display = "block";

  const overlayDiv = document.createElement("div");
  overlayDiv.style.width = "100%";
  overlayDiv.style.height = "100%";
  overlayDiv.style.position = "relative";
  overlayDiv.style.left = "0";
  overlayDiv.style.top = "-100%";
  overlayDiv.addEventListener("wheel", () => {
    overlayDiv.style.pointerEvents = "none";
    setTimeout(() => (overlayDiv.style.pointerEvents = "auto"), 15);
  });

  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.appendChild(iframe);
  container.appendChild(overlayDiv);

  return container;
}
