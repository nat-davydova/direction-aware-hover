const ANIMATION_DURATION_MS = 150;

const navigation = document.querySelector(".tiles-nav");
const navigationItems = document.querySelectorAll(".tiles-nav__item");

let mouseEnterFlag = false;

navigation.addEventListener("mousemove", (event) => {
  if (!event.target.closest(".tiles-nav__item")) {
    return;
  }

  const currentTile = event.target.closest(".tiles-nav__item");

  if (mouseEnterFlag) {
    return;
  }

  const isHovered = isDOMElementHovered(currentTile);

  if (!isHovered) {
    return;
  }

  const direction = getMousemoveDirection(event);

  mouseEnterFlag = true;

  createAndInsertHoverElem({ direction, parentElem: currentTile });
});

navigationItems.forEach((elem) => {
  elem.addEventListener("mouseleave", (event) => {
    const currentTile = event.target.closest(".tiles-nav__item");

    mouseEnterFlag = false;

    const hoverElem = currentTile.querySelector(".tile__hover-elem");
    hoverElem.classList.remove("js-visible");
    setTimeout(() => {
      hoverElem.remove();
    }, ANIMATION_DURATION_MS);
  });
});

function getMousemoveDirection(event) {
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

  return direction;
}

function createAndInsertHoverElem({ direction, parentElem }) {
  //check if there are old hoverElems and clear them. It can be if very fast mouseenter/mouseleave card
  const oldHoverElem = parentElem.querySelector(".tile__hover-elem");

  if (oldHoverElem) {
    oldHoverElem.remove();
  }

  const hoverElem = document.createElement("div");
  hoverElem.classList.add("tile__hover-elem");
  hoverElem.classList.add(`tile__hover-elem--${direction}`);
  hoverElem.style.transitionDuration = `${ANIMATION_DURATION_MS}ms`;
  parentElem.appendChild(hoverElem);
  setTimeout(() => {
    hoverElem.classList.add("js-visible");
  }, 10);

  return hoverElem;
}

function isDOMElementHovered(DOMElem) {
  const {
    left: DOMElemXLeft,
    right: DOMElemXRight,
    top: DOMElemYTop,
    bottom: DOMElemYBottom
  } = DOMElem.getBoundingClientRect();

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  const isHovered =
    cursorX >= DOMElemXLeft &&
    cursorX <= DOMElemXRight &&
    cursorY >= DOMElemYTop &&
    cursorY <= DOMElemYBottom;

  return isHovered;
}