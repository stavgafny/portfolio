import Duration from '../src/endpoints/utils/duration';

describe("duration validity", () => {
    test('check duration to ms - zero duration', () => {
        expect(Duration.toMS({ h: 0, m: 0, s: 0, ms: 0 })).toBe(0);
    });

    test('check duration to ms - milliseconds only', () => {
        expect(Duration.toMS({ h: 0, m: 0, s: 0, ms: 350 })).toBe(350);
    });

    test('check duration to ms - seconds only', () => {
        expect(Duration.toMS({ h: 0, m: 0, s: 10, ms: 0 })).toBe(10000);
    });

    test('check duration to ms - minutes and seconds', () => {
        expect(Duration.toMS({ h: 0, m: 5, s: 30, ms: 0 })).toBe(330000);
    });

    test('check duration to ms - hours, minutes, and seconds', () => {
        expect(Duration.toMS({ h: 2, m: 30, s: 45, ms: 0 })).toBe(9045000);
    });

    test('check duration to ms - hours, minutes, seconds and milliseconds', () => {
        expect(Duration.toMS({ h: 2, m: 30, s: 45, ms: 275 })).toBe(9045275);
    });


    test('check duration from ms - zero duration', () => {
        expect(Duration.fromMS(0)).toEqual({ h: undefined, m: undefined, s: undefined, ms: undefined });
    });

    test('check duration from ms - milliseconds only', () => {
        expect(Duration.fromMS(510)).toEqual({ h: undefined, m: undefined, s: undefined, ms: 510 });
    });

    test('check duration from ms - seconds only', () => {
        expect(Duration.fromMS(10000)).toEqual({ h: undefined, m: undefined, s: 10, ms: undefined });
    });

    test('check duration from ms - minutes and seconds', () => {
        expect(Duration.fromMS(330000)).toEqual({ h: undefined, m: 5, s: 30, ms: undefined });
    });

    test('check duration from ms - hours, minutes, and seconds', () => {
        expect(Duration.fromMS(9045000)).toEqual({ h: 2, m: 30, s: 45, ms: undefined });
    });

    test('check duration from ms - hours, minutes, seconds and milliseconds', () => {
        expect(Duration.fromMS(9045255)).toEqual({ h: 2, m: 30, s: 45, ms: 255 });
    });

    test('check duration from ms - large duration', () => {
        expect(Duration.fromMS(123456789)).toEqual({ h: 34, m: 17, s: 36, ms: 789 });
    });
});