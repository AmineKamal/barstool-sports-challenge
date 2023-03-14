export interface ICacheOptions<T> {
    label: string;
    ttl: number;
    requestOrigin: () => Promise<T>;
    requestCache: () => Promise<T>;
    saveCache: (value: T) => Promise<void>;
}

// We could improve this cache helper to use cache keys this would help if we want to be able to do a request with arguments
export class Cache<T> {
    private lastUpdated = 0;
    private originRequestPromise?: Promise<T>;
    private cacheRequestPromise?: Promise<T>;
    private savingToCachePromise?: Promise<void>;

    public constructor(private readonly options: ICacheOptions<T>) {}

    public async get() {
        // Check if we are already fetching a resource
        if (this.originRequestPromise) {
            return this.originRequestPromise;
        }

        // Check if we are currently saving something to the cache
        if (this.savingToCachePromise) {
            await this.savingToCachePromise;
        }

        // Check if we are already fetching cached resource
        if (this.cacheRequestPromise) {
            return this.cacheRequestPromise;
        }

        if (Date.now() - this.lastUpdated > this.options.ttl) return this.getFromOrigin();

        return this.getFromCache();
    }

    private async getFromOrigin() {
        console.log(`Consuming origin for ${this.options.label}`);
        this.originRequestPromise = this.options.requestOrigin();
        const res = await this.originRequestPromise;

        this.originRequestPromise = undefined;
        this.saveToCache(res);

        return res;
    }

    private async getFromCache() {
        console.log(`Hitting cache for ${this.options.label}`);
        this.cacheRequestPromise = this.options.requestCache();

        const res = await this.cacheRequestPromise;
        this.cacheRequestPromise = undefined;

        return res;
    }

    private async saveToCache(result: T) {
        console.log(`Saving to cache for ${this.options.label}`);
        this.savingToCachePromise = this.options.saveCache(result);
        await this.savingToCachePromise;

        this.lastUpdated = Date.now();
        this.savingToCachePromise = undefined;
    }
}
