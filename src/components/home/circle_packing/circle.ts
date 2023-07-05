import { P5CanvasInstance } from '@p5-wrapper/react'

const colors: [number, number, number][] = [
    [232, 95, 219],
    [100, 167, 254],
    [249, 229, 86],
];

export interface CircleOptions {
    readonly colorful: boolean
    readonly shape: "bubbles" | "stripes"
    readonly growingSize: number
    readonly initialRadius: number
    readonly padding: number
}


export default class Circle {

    static options: CircleOptions;

    static _getRandomColor(): [number, number, number] {
        return colors[Math.floor(Math.random() * 3)];
    }

    x: number;
    y: number;
    r: number;
    c: [number, number, number];
    growing: boolean;
    constructor(x: number, y: number, r: number = Circle.options.initialRadius) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.growing = Circle.options.growingSize > 0;
        this.c = Circle._getRandomColor();
    }

    grow(): void {
        this.r = this.r + Circle.options.growingSize;
    }

    update(p5: P5CanvasInstance, sketchSize: { x: number, y: number }, circles: Circle[]): void {
        if (!this.growing) return;
        if (this.intersectEdges(sketchSize)) {
            this.growing = false;
            return;
        }
        for (let i = 0; i < circles.length && this.growing; i++) {
            const circle = circles[i];
            if (circle !== this) {
                const dist = p5.dist(this.x, this.y, circle.x, circle.y);
                if (dist - Circle.options.padding < this.r + circle.r) {
                    this.growing = false;
                    circle.growing = false;
                    return;
                }
            }

        }
        this.grow();
    }

    display(p5: P5CanvasInstance): void {
        p5.push();
        p5.noFill();
        p5.strokeWeight(1.5);
        p5.stroke(Circle.options.colorful ? this.c : 255);
        p5.translate(this.x, this.y);
        Circle.options.shape === "bubbles" ?
            p5.ellipse(0, 0, this.r * 2) :
            p5.line(0, 0, this.r, this.r);
        p5.pop();
    }



    intersectEdges(size: { x: number, y: number }): boolean {
        return (
            this.x - this.r <= Circle.options.padding ||
            this.x + this.r >= size.x - Circle.options.padding ||
            this.y - this.r <= Circle.options.padding ||
            this.y + this.r >= size.y - Circle.options.padding
        );
    }

    intersects(p5: P5CanvasInstance, position: { x: number, y: number }): boolean {
        const dist = p5.dist(this.x, this.y, position.x, position.y);
        return dist - Circle.options.padding < this.r;
    }
}