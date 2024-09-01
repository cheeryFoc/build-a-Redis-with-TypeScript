import { CommonResponse } from '@/context/CommonResponseCommand';
import { Result } from '@/domain/Result';

export class AnalysisService implements RedisParser<string>{

    encodedRedisResponse(data: Buffer): string {

        const [command, ...args] = data.toString().split("\r\n");;

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
    }


}
