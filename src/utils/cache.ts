interface CacheItem<T> {
  value: T;
  timestamp: number;
}

class Cache {
  private storage: Map<string, CacheItem<any>> = new Map();
  
  set<T>(key: string, value: T, ttlMs: number): void {
    this.storage.set(key, {
      value,
      timestamp: Date.now() + ttlMs
    });
  }
  
  get<T>(key: string): T | null {
    const item = this.storage.get(key);
    if (!item) return null;
    
    if (Date.now() > item.timestamp) {
      this.storage.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  clear(): void {
    this.storage.clear();
  }
}

export const cache = new Cache();