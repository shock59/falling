import YouTubePlayer from "youtube-player";

type PlayerOptions = {
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  captions?: boolean;
};

export default function youtubeWidget(
  videoId: string,
  playerOptions: PlayerOptions | undefined = undefined
) {
  const thumbnailDiv = document.createElement("div");
  thumbnailDiv.style.width = "100%";
  thumbnailDiv.style.height = "100%";
  thumbnailDiv.style.backgroundImage = `url("https://img.youtube.com/vi/${videoId}/maxresdefault.jpg")`;
  thumbnailDiv.style.backgroundSize = "contain";
  thumbnailDiv.style.backgroundPosition = "center";
  thumbnailDiv.style.backgroundRepeat = "no-repeat";

  const playerDiv = document.createElement("div");
  playerDiv.style.width = "100%";
  playerDiv.style.height = "100%";
  playerDiv.style.display = "none";

  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.height = "100%";
  container.appendChild(thumbnailDiv);
  container.appendChild(playerDiv);
  if (playerOptions?.controls != true) {
    const overlayDiv = document.createElement("div");
    overlayDiv.style.width = "100%";
    overlayDiv.style.height = "100%";
    overlayDiv.style.position = "relative";
    overlayDiv.style.left = "0";
    overlayDiv.style.top = "-100%";
    overlayDiv.style.pointerEvents = "none !important";
    container.appendChild(overlayDiv);
  }

  loadVideo(playerDiv, thumbnailDiv, videoId, playerOptions);

  return container;
}

async function loadVideo(
  playerDiv: HTMLDivElement,
  thumbnailDiv: HTMLDivElement,
  videoId: string,
  playerOptions: PlayerOptions = {}
) {
  playerOptions = {
    autoplay: playerOptions.autoplay ?? true,
    muted: playerOptions.muted ?? true,
    controls: playerOptions.controls ?? false,
    captions: playerOptions.captions ?? false,
  };

  const player = YouTubePlayer(playerDiv, {
    playerVars: {
      autoplay: 0,
      controls: playerOptions.controls ? 1 : 0,
      // @ts-expect-error
      cc_load_policy: playerOptions.captions ? 1 : 3,
    },
  });

  await player.loadVideoById(videoId);
  if (playerOptions.muted) await player.mute();
  if (playerOptions.autoplay) await player.playVideo();
  else await player.stopVideo();

  player.on("stateChange", async (event) => {
    if (event.data != (playerOptions.autoplay ? 1 : -1)) return;
    (await player.getIframe()).style.display = "block";
    thumbnailDiv.style.display = "none";
  });
}
