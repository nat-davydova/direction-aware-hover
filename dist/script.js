const ANIMATION_DURATION_MS = 200;

const navigation = document.querySelector(".tiles-nav");
const navigationItems = document.querySelectorAll(".tiles-nav__item");

let mouseEnterFlag;

navigation.addEventListener("mousemove", (event) => showHoverElem(event));

navigationItems.forEach((elem) => {
  elem.addEventListener("mouseleave", (event) => removeHoverElem(event));
});

function showHoverElem(event) {
  if (!event.target.closest(".tiles-nav__item")) {
    return;
  }

  const currentTile = event.target.closest(".tiles-nav__item");

  if (mouseEnterFlag) {
    return;
  }

  const isHovered = isDOMElementHovered({ event, DOMElem: currentTile });

  if (!isHovered) {
    return;
  }

  const direction = getMousemoveDirection(event);

  mouseEnterFlag = true;

  createAndInsertHoverElem({ direction, parentElem: currentTile });
}

function getMousemoveDirection(event) {
  if (
    event.movementY > 0 &&
    (Math.abs(event.movementY) > Math.abs(event.movementX) ||
      Math.abs(event.movementY) === Math.abs(event.movementX))
  ) {
    return "down";
  }

  if (
    event.movementY < 0 &&
    (Math.abs(event.movementY) > Math.abs(event.movementX) ||
      Math.abs(event.movementY) === Math.abs(event.movementX))
  ) {
    return "up";
  }

  if (
    event.movementX > 0 &&
    Math.abs(event.movementX) > Math.abs(event.movementY)
  ) {
    return "right";
  }

  if (
    event.movementX < 0 &&
    Math.abs(event.movementX) > Math.abs(event.movementY)
  ) {
    return "left";
  }
}

function createAndInsertHoverElem({ direction, parentElem }) {
  //check if there are old hoverElems and clear them. It can be if very fast mouseenter/mouseleave card
  clearStaleHoverItems(parentElem);

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

function removeHoverElem(clearingEvent) {
  let directionOut;

  document.addEventListener(
    "mousemove",
    (event) => {
      directionOut = getMousemoveDirection(event);

      const currentTile = clearingEvent.target.closest(".tiles-nav__item");

      mouseEnterFlag = false;

      if (!currentTile) {
        return;
      }

      const hoverElem = currentTile.querySelector(".tile__hover-elem");

      if (!hoverElem) {
        return;
      }

      hoverElem.classList.add(`tile__hover-elem--out-${directionOut}`);

      hoverElem.classList.remove("js-visible");
      setTimeout(() => {
        hoverElem.remove();
      }, ANIMATION_DURATION_MS);
    },
    { once: true }
  );
}

function clearStaleHoverItems(parentElem) {
  const staleHoverElem = parentElem.querySelector(".tile__hover-elem");

  if (staleHoverElem) {
    staleHoverElem.remove();
  }
}

function isDOMElementHovered({ event, DOMElem }) {
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