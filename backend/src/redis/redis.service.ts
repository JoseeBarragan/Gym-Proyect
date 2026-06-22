import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import type { RedisClientType } from "redis";
import { createClient } from "redis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client!: RedisClientType

    async onModuleInit() {
        this.client = createClient({
            socket: {
                host: process.env.REDIS_HOST || "localhost",
                port: parseInt(process.env.REDIS_PORT || "6379", 10),
            }
        });
        await this.client.connect();
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    get(key: string) {
        return this.client.get(key);
    }

    set(key: string, value: string, ttlSeconds?: number) {
      return this.client.set(key, value, ttlSeconds ? { EX: ttlSeconds } : undefined)
    }

    del(key: string) {
      return this.client.del(key)
    }

}