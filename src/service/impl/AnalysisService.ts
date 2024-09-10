import { CommonResponse } from '@/context/CommonResponseCommand';
import { Result } from '@/domain/Result';
import { RedisParser } from '@/service/RedisParser';
export class AnalysisService implements RedisParser<string> {

    encodedRedisResponse(data: Buffer): string {

        try {
            const [command, ...args] = this.formatDate(data);

            switch (command.toLowerCase()) {
                case 'ping':
                    return Result.ok(CommonResponse.Pong);
                case 'echo':
                    return `$${args[0].length}\r\n${args[0]}\r\n`;
                case 'set':
                //
                case 'get':
                //
                default:
                    return Result.ok(CommonResponse.COMMAND_NOT_FOUND);
            }
            
        } catch (error) {
            console.error("Error processing data:", error);
        } finally {
            return Result.error("Processing error");
        }

    }

    formatDate(data: Buffer): Array<string> {

        if (data === null || data === undefined) return new Array();

        const list: Array<string> = data.toString().split("\r\n").slice(2).filter(item => !item.includes('$'));

        return list;
    }

}
