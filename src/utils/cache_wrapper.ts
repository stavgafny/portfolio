type CacheName = `$${string}`;

export interface CacheSegment<DataType> {
    data: DataType;
    expirationDate: number;
}

/// Useful for storing data that doesn't need to be loaded or fetched every single time
export default class CacheWrapper<DataType> {
    private static readonly $storageHandler = {
        get: (key: string) => localStorage.getItem(key),
        set: (key: string, value: string) => localStorage.setItem(key, value),
    } as const;

    private static isExpired = (expirationDate: number) => expirationDate < Date.now();

    private readonly cacheName: CacheName;
    private readonly expirationDuration: number;
    private segmentBuilder: () => Promise<DataType | null>;

    constructor({ cacheName, expirationDuration, segmentBuilder }: { cacheName: CacheName, expirationDuration: number, segmentBuilder: () => Promise<DataType | null> }) {
        this.cacheName = cacheName;
        this.expirationDuration = expirationDuration;
        this.segmentBuilder = segmentBuilder;

    }

    private logCache = (): void => {
        return console.info(`--Caching built segment [${this.cacheName}] for {${_formatTime(this.expirationDuration)}}`);
    }

    private getSegment(): CacheSegment<DataType> | null {
        try {
            const { data, expirationDate }: CacheSegment<DataType>
                = JSON.parse(CacheWrapper.$storageHandler.get(this.cacheName) ?? "");
            if (!data || !expirationDate) throw null;
            return { data, expirationDate };
        } catch {
            return null;
        }

    }

    private storeSegment({ data }: { data: DataType }): void {
        const segment: CacheSegment<DataType> = {
            data: data,
            expirationDate: new Date().setTime(Date.now() + this.expirationDuration),
        };
        CacheWrapper.$storageHandler.set(this.cacheName, JSON.stringify(segment));
        this.logCache();
    }

    async getData(): Promise<DataType | null> {
        const segment = this.getSegment();
        if (segment && !CacheWrapper.isExpired(segment.expirationDate)) {
            return segment.data;
        }
        try {
            const data = await this.segmentBuilder();
            if (!data) throw null;
            this.storeSegment({ data });
            return data;
        } catch {
            return null;
        }
    }
}

const _formatTime = (time: number): string => {
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
  
    if (time < minute) return `${time}s`; 
    if (time < hour) return `${Math.floor(time / minute)}m`; 
    if (time < day) return `${Math.floor(time / hour)}h`; 
    return `${Math.floor(time / day)}d`; 
  }