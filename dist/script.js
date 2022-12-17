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

  if (event.movementY > 0 && event.movementX === 0) {
    direction = "down";
  }

  if (event.movementY < 0 && event.movementX === 0) {
    direction = "up";
  }

  if (event.movementY === 0 && event.movementX > 0) {
    direction = "right";
  }

  if (event.movementY === 0 && event.movementX < 0) {
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