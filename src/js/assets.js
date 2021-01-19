///--- Image loading variables ---///
let sprites = [];
let readySprites = [];
let currentSprite = 0;
let loadedAllSprites = false;

let buttonSpriteAmount = 38;

///--- Image loading ---///
// Loading button icons
for (
    currentSprite = 0;
    currentSprite < buttonSpriteAmount + 1;
    currentSprite++
) {
    sprites[currentSprite] = new Image();
    readySprites[currentSprite] = false;
    sprites[currentSprite].onLoad = new (function () {
        readySprites[currentSprite] = true;
    })();
    sprites[currentSprite].src =
        "./assets/buttons/" + currentSprite.toString() + ".png";
}
// Loading items image
sprites[currentSprite] = new Image();
readySprites[currentSprite] = false;
sprites[currentSprite].onLoad = new (function () {
    readySprites[currentSprite] = true;
})();
sprites[currentSprite].src = "./assets/icons.png";

currentSprite += 1;

// Loading background image
sprites[currentSprite] = new Image();
readySprites[currentSprite] = false;
sprites[currentSprite].onLoad = new (function () {
    readySprites[currentSprite] = true;
})();
sprites[currentSprite].src = "./assets/background.png";

currentSprite += 1;

// Loading item top image
sprites[currentSprite] = new Image();
readySprites[currentSprite] = false;
sprites[currentSprite].onLoad = new (function () {
    readySprites[currentSprite] = true;
})();
sprites[currentSprite].src = "./assets/box-hover.png";

currentSprite += 1;

// Loading item bottom image
sprites[currentSprite] = new Image();
readySprites[currentSprite] = false;
sprites[currentSprite].onLoad = new (function () {
    readySprites[currentSprite] = true;
})();
sprites[currentSprite].src = "./assets/box.png";

currentSprite += 1;

// Loading arrow01 image
sprites[currentSprite] = new Image();
readySprites[currentSprite] = false;
sprites[currentSprite].onLoad = new (function () {
    readySprites[currentSprite] = true;
})();
sprites[currentSprite].src = "./assets/arrow.png";

currentSprite += 1;

///--- Shorthand references ---///
let spriteBackground = sprites[currentSprite - 4];
let spriteItemTop = sprites[currentSprite - 3];
let spriteItemBottom = sprites[currentSprite - 2];
let spriteArrow01 = sprites[currentSprite - 1];
let spriteItemImage = sprites[currentSprite - 5];
