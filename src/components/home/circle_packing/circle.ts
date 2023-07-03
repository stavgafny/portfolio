import { P5CanvasInstance } from '@p5-wrapper/react'


export default class Circle {

    static readonly groingSize: number = 0.25;
    static readonly circlePadding: number = 2;

    x: number;
    y: number;
    r: number;
    growing: boolean;
    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.growing = true;
    }

    grow(): void {
        this.r = this.r + Circle.groingSize;
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
                if (dist - Circle.circlePadding < this.r + circle.r) {
                    this.growing = false;
                    return;
                }
            }

        }
        this.grow();
    }

    display(p5: P5CanvasInstance): void {
        p5.push();
        p5.noFill();
        p5.strokeWeight(2);
        p5.stroke(255);
        p5.translate(this.x, this.y);
        p5.ellipse(0, 0, this.r * 2);
        p5.pop();
    }



    intersectEdges(size: { x: number, y: number }): boolean {
        return (
            this.x - this.r <= Circle.circlePadding ||
            this.x + this.r >= size.x - Circle.circlePadding ||
            this.y - this.r <= Circle.circlePadding ||
            this.y + this.r >= size.y - Circle.circlePadding
        );
    }

    intersects(circle: Circle): boolean {
        return false;
    }
}