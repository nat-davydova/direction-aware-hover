const tile1 = document.querySelector(".tiles-nav__item");

tile1.addEventListener("mouseenter", (event) => {
  const {
    left: tileXLeft,
    right: tileXRight,
    top: tileYTop,
    bottom: tileYBottom,
    width: tileWidth,
    height: tileWidthHeight
  } = tile1.getBoundingClientRect();

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  const horzDirection = cursorX < tileWidth / 2 ? "left" : "right";

  console.log({ cursorX, cursorY });
  console.log({ tileXLeft, tileXRight, tileYTop, tileYBottom });
  console.log(horzDirection);
});
