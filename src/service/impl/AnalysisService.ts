import { CommonResponse } from '@/context/CommonResponseCommand';
import { Result } from '@/domain/Result';
import { RedisParser } from '@/service/RedisParser';
import { log } from 'node:console';
export class AnalysisService implements RedisParser<string> {

    encodedRedisResponse(data: Buffer): string {

        const container = new Map();

        try {
            const [command, ...args] = this.formatDate(data);

            // console.log(args)

            switch (command.toLowerCase()) {
                case 'ping':
                    return Result.ok(CommonResponse.Pong);
                case 'echo':
                    return `$${args[0].length}\r\n${args[0]}\r\n`;
                case 'set':
                    container.set(args[0], args[1]);
                    return Result.ok(CommonResponse.OK);
                case 'get':
                    console.log(args[0]);
                    const value = container.get(`${args[0]}`);
                    console.log(value);
                    return `$${value ? value.length + '\r\n' + value : '-1'}\r\n`;
                default:
                    return Result.ok(CommonResponse.COMMAND_NOT_FOUND);
            }

        } catch (error) {
            console.error("Error processing data:", error);
            return Result.error("Processing error");
        }

    }

    formatDate(data: Buffer): Array<string> {

        if (data === null || data === undefined) return new Array();

        const list: Array<string> = data.toString().split("\r\n").slice(2).filter(item => !item.includes('$'));

        return list;
    }

}
