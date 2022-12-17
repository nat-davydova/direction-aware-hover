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

  const tileCenterX = tileXLeft + (tileXRight - tileXLeft) / 2;
  const tileCenterY = tileYTop + (tileYBottom - tileYTop) / 2;

  const horzDirection = cursorX < tileCenterX ? "left" : "right";
  const vertDirection = cursorY < tileCenterY ? "top" : "bottom";

  console.log({ cursorX, cursorY });
  console.log({ tileXLeft, tileXRight, tileYTop, tileYBottom });
  console.log(horzDirection, vertDirection);
});