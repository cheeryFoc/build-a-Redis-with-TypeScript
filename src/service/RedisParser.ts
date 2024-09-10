export interface RedisParser<T> {
    encodedRedisResponse(command: Buffer): T;

    formatDate(data: Buffer): Array<T>;
}