interface RedisParser<T> {
    encodedRedisResponse(command: Buffer): T;
}