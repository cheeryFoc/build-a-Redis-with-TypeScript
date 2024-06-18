import { CommonResponseCommand } from '@/context/CommonResponseCommand';

export class AnalysisService {

    encodedRedisResponse(command: Buffer): string {
        let response: string = command.toString();
        return `+${CommonResponseCommand.Pong}\r\n`;
    }

}
