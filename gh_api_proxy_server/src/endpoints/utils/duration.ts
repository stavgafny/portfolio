export type DurationType = {
    h?: number
    m?: number
    s?: number
    ms?: number
}

export default class Duration {
    private static readonly H = 3600 * 1000;
    private static readonly M = 60 * 1000;
    private static readonly S = 1000;
    private static readonly MS = 1;


    static toMS({ h, m, s, ms }: DurationType): number {
        return (h ? h * this.H : 0) + (m ? m * this.M : 0) + (s ? s * this.S : 0) + (ms ? ms * this.MS : 0);
    }

    static fromMS(ms: number): DurationType {
        const h = Math.floor(ms / this.H);
        const m = Math.floor((ms % this.H) / this.M);
        const s = Math.floor(((ms % this.H) % this.M) / this.S);
        ms = ms % this.S;
        return {
            h: h > 0 ? h : undefined,
            m: m > 0 ? m : undefined,
            s: s > 0 ? s : undefined,
            ms: ms > 0 ? ms : undefined
        }
    }

    static format(t: DurationType | number): string {
        if (typeof t === 'number') {
            t = this.fromMS(t);
        }
        const { h, m, s } = t;
        return [h, m, s].map(t => (t ?? 0).toString().padStart(2, '0')).join(":");
    }
}