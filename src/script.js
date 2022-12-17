const tile = document.querySelectorAll(".tiles-nav__item")[1];

tile.addEventListener("mouseenter", (event) => {
  const {
    left: tileXLeft,
    right: tileXRight,
    top: tileYTop,
    bottom: tileYBottom,
    width: tileWidth,
    height: tileHeight
  } = tile.getBoundingClientRect();

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  const horzCenter = tileXLeft + (tileXRight - tileXLeft) / 2;

  const horzDirection = cursorX < horzCenter ? "left" : "right";

  console.log({ cursorX, cursorY });
  console.log({ tileXLeft, tileXRight, tileYTop, tileYBottom });
  console.log(horzDirection);
});
