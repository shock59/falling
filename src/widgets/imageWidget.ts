export default function imageWidget(src: string) {
  const div = document.createElement("div");
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.backgroundImage = `url("${src}")`;
  div.style.backgroundSize = "contain";
  div.style.backgroundPosition = "center";
  div.style.backgroundRepeat = "no-repeat";
  return div;
}
