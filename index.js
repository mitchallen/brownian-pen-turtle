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
        // define the center
        cx = width / 2,
        cy = height / 2;;

    let constrain = function (tx, ty) {
        // return false if pen coordinates outside of margin
        let margin = 10.0
        return (tx >= margin && ty >= margin && tx <= (width - margin) && ty <= (height - margin))
    }

    let pen1 = factory.create({
        x: cx * 1.5,        // initialize at image center
        y: cy * 1.5,
        color: 0xFF0000,    // red pen (will override below)
        width: 4,           // pen width (will override below) 
        alpha: 0.8,         // pen alpha value
        constrain,
    });

    // define the number of movesa and turns to make
    let moves = 1000
    // define a range for random movement
    let dmin = width / 10.0
    let dmax = width / 20.0

    pen1
        .down();

    for (let i = 0; i < moves; i++) {
        let d1 = Math.random() * (dmax - dmin) + dmin
        let a1 = Math.random() * 360
        // randomly move distance (d1) and turn randomly (a1)
        pen1
            .forward(d1)
            .turn(a1)
    }

    // write the pen path and values to an SVG file

    writer = svgFactory.create({})

    writer
        .addPen(pen1,
            {
                color: 0x000000,    // override pen color
                width: 2,           // override pen width
            }
        ).writeSVG({
            width,
            height,
            filename: "./output/brownian.svg"
        });
}

main()