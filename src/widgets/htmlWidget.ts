export default function htmlWidget(customHtml: string) {
  const div = document.createElement("div");
  div.style.width = "100%";
  div.style.height = "100%";
  div.innerHTML = customHtml;
  return div;
}
