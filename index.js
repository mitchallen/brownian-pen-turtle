/**
 * Author: Mitch Allen
 * https://mitchallen.com
 * https://scriptable.com
 */

const factory = require("@mitchallen/pen-turtle");
const svgFactory = require("@mitchallen/pen-svg");

function main() {
    let width = 1024,
        height = 1024,
        cx = width / 2,
        cy = height / 2,
        writer = svgFactory.create({});

    let constrain = function (tx, ty) {
        let margin = 10.0
        return (tx >= margin && ty >= margin && tx <= (width - margin) && ty <= (height - margin))
    }

    let pen1 = factory.create({
        x: cx * 1.5,
        y: cy * 1.5,
        color: 0xFF0000,    // red pen
        width: 4,           // pen width 
        alpha: 0.8,          // pen alpha value
        constrain,
    });

    let limit = 1000
    // define a range for random movement
    let dmin = width / 10.0
    let dmax = width / 20.0

    pen1
        .down();
    for (let i = 0; i < limit; i++) {
        let d1 = Math.random() * (dmax - dmin) + dmin
        let a1 = Math.random() * 360
        pen1
            .forward(d1)
            .turn(a1)
    }

    writer
        .addPen(pen1,
            {
                color: 0x000000,
                width: 2,
            }
        ).writeSVG({
            width,
            height,
            filename: "./output/brownian.svg"
        });
}

main()