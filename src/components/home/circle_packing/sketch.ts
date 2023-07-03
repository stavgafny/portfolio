import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react'
import Circle from './circle';


const _pushedCirclesPerFrame = 2;
const _maxAttemptsPerFrame = 100;

const sketch: Sketch = (p5: P5CanvasInstance) => {
    const sketchSize = { x: 950, y: 120 };
    const spots: { x: number, y: number }[] = [];
    const circles: Circle[] = [];
    let image: any;

    p5.preload = () => {
        image = p5.loadImage("/data/home_circle_packing.png");
    }

    p5.setup = () => {
        p5.createCanvas(sketchSize.x, sketchSize.y);
        image.loadPixels();
        for (let i = 0; i < image.pixels.length; i += 4) {
            const [r, g, b, a] = [image.pixels[i], image.pixels[i + 1], image.pixels[i + 2], image.pixels[i + 3]];
            const brightness = r + g + b;
            if (brightness > 0) {
                const pixelIndex = Math.floor(i / 4);
                spots.push(
                    {
                        x: pixelIndex % image.width,
                        y: Math.floor(pixelIndex / image.width)
                    }
                );
            }
        }
    }

    p5.draw = () => {
        p5.clear();
        p5.background(0, 0, 0, 0);

        pushCircles();

        for (const circle of circles) {
            circle.display(p5);
            circle.update(p5, sketchSize, circles);
        }
    }

    const createNewCircle = (): Circle | null => {
        const randomSpot = spots[Math.floor(p5.random(0, spots.length))];

        const { x, y } = randomSpot;
        let valid = true;
        for (let i = 0; i < circles.length && valid; i++) {
            const circle = circles[i];
            const dist = p5.dist(x, y, circle.x, circle.y);
            if (dist - Circle.circlePadding < circle.r) {
                valid = false;
            }

        }
        return valid ? new Circle(x, y, 1) : null;
    }

    const pushCircles = (): void => {
        let [count, attempts] = [0, 0];
        while (count < _pushedCirclesPerFrame) {
            const circle = createNewCircle();
            if (circle) {
                circles.push(circle);
                count++;
            } else {
                attempts++;
            }

            if (attempts > _maxAttemptsPerFrame) {
                p5.noLoop();
                return;
            }
        }
    }
}

export default sketch;