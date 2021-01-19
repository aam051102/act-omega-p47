document.addEventListener("DOMContentLoaded", () => {
    ///--- Canvas setup ---///
    // Load canvas and canvas context
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");

    // Set canvas specifics
    ctx.fillStyle = "black";
    ctx.font = "bold 14px courier";
    ctx.imageSmoothingEnabled = false;

    ///--- Variables ---///

    // Item variables
    let selectedItem = 0;
    let currentColour = 0;
    let itemAmountTop = 5;

    // Arrow X and Y position variables
    let itemArrowX = [
        [304, 350],
        [93, 135],
        [384, 435],
        [186, 233],
        [434, 483],
    ];

    let itemArrowY = [
        [369, 372],
        [318, 317],
        [346, 348],
        [356, 351],
        [297, 296],
    ];

    // Arrow positioning variables
    let arrowY = 0;
    let arrowTurn = 0;

    let boxX = canvas.width - (16 + (spriteBackground.width + 7) * 0) + 5;

    // Fade-in strength variable (Should always be 1.0)
    let fadeStrength = 1.0;

    // Mouse and screen variables
    let mx = 0;
    let my = 0;
    let BB = canvas.getBoundingClientRect();
    let BBoffsetX = BB.left;
    let BBoffsetY = BB.top;

    ///--- Event handlers ---///
    canvas.addEventListener("mousemove", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Set mouse coordinates
        mx = e.clientX - BBoffsetX;
        my = e.clientY - BBoffsetY;
    });

    canvas.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();

        ///--- Cursor actions ---///
        if (canvas.style.cursor == "pointer") {
            switch (selectedItem) {
                case 0:
                    window.top.location.href = "http://mspfa.com/?s=16414&p=48";
                    break;

                case 1:
                    window.top.location.href = "http://mspfa.com/?s=16414&p=54";
                    break;

                case 2:
                    window.top.location.href = "http://mspfa.com/?s=16414&p=61";
                    break;

                case 3:
                    window.top.location.href = "http://mspfa.com/?s=16414&p=68";
                    break;

                case 4:
                    window.top.location.href = "http://mspfa.com/?s=16414&p=76";
                    break;

                // Easteregg
                case 5:
                    window.top.location.href = "http://mspfa.com/?s=17206&p=3";
                    break;
            }
        }
    });

    ///--- Main game loop ---///
    const update = () => {
        ///--- Sprite load check ---///
        if (loadedAllSprites == false) {
            loadedAllSprites = true;

            for (var n = 0; n < readySprites.length; n++) {
                if (readySprites[n] == false) {
                    loadedAllSprites = false;
                    break;
                }
            }
        } else {
            ///--- Clear ---///
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ///--- Variable reset ---///
            selectedItem = -1;

            ///--- Background image ---///
            ctx.drawImage(spriteBackground, 0, 0);

            ///--- Fading in ---///
            if (fadeStrength > 0) {
                ctx.globalAlpha = fadeStrength;

                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.globalAlpha = 1;

                fadeStrength -= 1 / 13;
            }

            ///--- Item backgrounds ---///
            ctx.drawImage(
                spriteItemImage,
                16 + (spriteItemBottom.width + 7) * 0 + boxX,
                23
            );

            ///--- Moving boxes in ---///
            if (fadeStrength <= 0) {
                if (boxX > 0) {
                    boxX -= 155;
                } else {
                    boxX = 0;
                }
            }

            ///--- Item hover cursor change ---///
            for (var n = 0; n < itemAmountTop; n++) {
                if (
                    mx >= 16 + (spriteItemBottom.width + 6) * n &&
                    my >= 23 &&
                    mx <=
                        16 +
                            (spriteItemBottom.width + 6) * n +
                            spriteItemBottom.width &&
                    my <= 23 + spriteItemBottom.height
                ) {
                    canvas.style.cursor = "pointer";
                    selectedItem = n;
                }
            }

            if (selectedItem == -1) {
                // Easteregg
                if (mx >= 280 && my >= 314 && mx <= 312 && my <= 368) {
                    canvas.style.cursor = "pointer";
                    selectedItem = 5;
                }
                // Resetting mouse cursor
                else {
                    canvas.style.cursor = "default";
                }
            }

            ///--- Selection box & arrows ---///
            for (var n = 0; n < itemAmountTop; n++) {
                if (selectedItem == n) {
                    ctx.drawImage(
                        spriteItemTop,
                        15 + (spriteItemTop.width + 4) * n + boxX,
                        22
                    );

                    // Drawing the arrows
                    for (var i = 0; i < itemArrowX[n].length; i++) {
                        ctx.drawImage(
                            spriteArrow01,
                            itemArrowX[n][i],
                            itemArrowY[n][i] + arrowY
                        );
                    }
                }
            }

            ///--- Flashing text ---///
            if (currentColour == 0) {
                currentColour = 1;

                ctx.fillStyle = "red";

                ctx.fillText("CHOOSE YOUR CHARACTERS!", 240, 14);

                ctx.fillStyle = "black";
            } else if (currentColour == 1) {
                currentColour = 0;

                ctx.fillStyle = "yellow";

                ctx.fillText("CHOOSE YOUR CHARACTERS!", 240, 14);

                ctx.fillStyle = "black";
            }

            ///---MAKING THE ARROWS MOVE UP AND DOWN---///
            if (arrowTurn == 0) {
                arrowY -= 1;

                if (arrowY <= -5) {
                    arrowTurn = 1;
                }
            } else if (arrowTurn == 1) {
                arrowY += 1;

                if (arrowY >= 0) {
                    arrowTurn = 0;
                }
            }
        }
    };

    setInterval(update, 1000 / 24);
});
