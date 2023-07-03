import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react'
import Circle from './circle';


const _pushedCirclesPerFrame = 2;
const _maxAttemptsPerFrame = 100;

const sketch: Sketch = (p5: P5CanvasInstance) => {
    const sketchSize = { x: 800, y: 200 };
    const circles: Circle[] = [];


    const createNewCircle = (): Circle | null => {
        const [x, y] = [p5.random(sketchSize.x), p5.random(sketchSize.y)];
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

    p5.setup = () => {
        p5.createCanvas(sketchSize.x, sketchSize.y);
    }

    p5.draw = () => {
        p5.clear();
        p5.background([0, 0, 0, 0]);

        pushCircles();

        for (const circle of circles) {
            circle.display(p5);
            circle.update(p5, sketchSize, circles);
        }
    }
}

export default sketch;