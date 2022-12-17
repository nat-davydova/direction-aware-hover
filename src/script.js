const tile = document.querySelectorAll(".tiles-nav__item")[1];

let mouseEnterFlag = false;

tile.addEventListener("mousemove", (event) => {
  if (mouseEnterFlag) {
    return;
  }

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

  const isHovered =
    cursorX >= tileXLeft &&
    cursorX <= tileXRight &&
    cursorY >= tileYTop &&
    cursorY <= tileYBottom;

  if (!isHovered) {
    return;
  }

  let direction = "";

  if (
    event.movementY > 0 &&
    (Math.abs(event.movementY) > Math.abs(event.movementX) ||
      event.movementY === event.movementX)
  ) {
    direction = "down";
  }

  if (
    event.movementY < 0 &&
    (Math.abs(event.movementY) > Math.abs(event.movementX) ||
      event.movementY === event.movementX)
  ) {
    direction = "up";
  }

  if (
    event.movementX > 0 &&
    Math.abs(event.movementX) > Math.abs(event.movementY)
  ) {
    direction = "right";
  }

  if (
    event.movementX < 0 &&
    Math.abs(event.movementX) > Math.abs(event.movementY)
  ) {
    direction = "left";
  }

  mouseEnterFlag = true;

  console.log({ cursorX, cursorY });
  //console.log({ tileXLeft, tileXRight, tileYTop, tileYBottom });
  console.log(isHovered);
  console.log({
    direction,
    movementX: event.movementX,
    movementY: event.movementY
  });
});

tile.addEventListener("mouseleave", () => (mouseEnterFlag = false));
