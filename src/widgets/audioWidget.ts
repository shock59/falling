export default function audioWidget(src: string) {
  const audio = document.createElement("audio");
  audio.src = src;

  const playImage = document.createElement("img");
  playImage.src = "play.svg";
  playImage.style.height = "100%";
  playImage.style.pointerEvents = "none";

  const playButton = document.createElement("button");
  playButton.style.padding = "0";
  playButton.style.margin = "4% 4%";
  playButton.style.height = "80%";
  playButton.style.border = "none";
  playButton.style.outline = "none";
  playButton.style.background = "none";
  playButton.style.cursor = "pointer";
  playButton.appendChild(playImage);

  const playedProgressDiv = document.createElement("div");
  playedProgressDiv.style.width = "0%";
  playedProgressDiv.style.height = "100%";
  playedProgressDiv.style.background = "rgb(255, 255, 255)";

  const fullProgressDiv = document.createElement("div");
  fullProgressDiv.style.flexGrow = "1";
  fullProgressDiv.style.height = "25%";
  fullProgressDiv.style.background = "rgb(255, 255, 255, 0.5)";
  fullProgressDiv.appendChild(playedProgressDiv);

  const timeText = document.createElement("span");
  timeText.style.fontFamily = '"Inter", sans-serif';
  timeText.style.fontVariantNumeric = "tabular-nums";
  timeText.style.textWrap = "nowrap";
  timeText.style.textOverflow = "clip";
  timeText.style.overflow = "hidden";
  timeText.style.margin = "0 8%";
  timeText.innerText = "0:00 / 0:00";

  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.fontSize = "100%";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.appendChild(audio);
  container.appendChild(playButton);
  container.appendChild(fullProgressDiv);
  container.appendChild(timeText);

  const updateTime = () => {
    timeText.innerHTML = `${formatTimestamp(
      audio.currentTime
    )} / ${formatTimestamp(audio.duration)}`;

    playedProgressDiv.style.width = `${
      (audio.currentTime / audio.duration) * 100
    }%`;
  };

  const updateFontSize = () => {
    timeText.style.fontSize = `${container.offsetHeight * 0.4}px`;
    requestAnimationFrame(updateFontSize);
  };
  updateFontSize();

  audio.addEventListener("loadedmetadata", updateTime);
  audio.addEventListener("timeupdate", updateTime);
  audio.addEventListener("ended", () => {
    audio.pause();
    playImage.src = "play.svg";
    playing = false;
  });

  let playing = false;

  playButton.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playImage.src = "pause.svg";
    } else {
      audio.pause();
      playImage.src = "play.svg";
    }
    playing = !playing;
  });

  return container;
}

function prependZero(num: number) {
  return num < 10 ? `0${num}` : String(num);
}

function formatTimestamp(seconds: number) {
  return `${Math.floor(seconds / 60)}:${prependZero(Math.floor(seconds) % 60)}`;
}
