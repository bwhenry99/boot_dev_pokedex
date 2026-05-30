export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number)
    {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T extends any>(key: string, val: T) 
    {
        this.#cache.set(key, {createdAt: Date.now(), val: val});
    };

    get(key: string)
    {
        const cache = this.#cache.get(key);
        if(cache)
        {
            return cache.val;
        }
        return undefined;
    };

    #reap()
    {
        const time = Date.now();
        for(const entry of this.#cache)
        {
            if(time - entry[1].createdAt > this.#interval)
            {
                this.#cache.delete(entry[0]);
            }
        }
    }

    #startReapLoop()
    {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop()
    {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
};
