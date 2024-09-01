import * as net from "net";
import { AnalysisService } from '@/service/impl/AnalysisService';

let analysisService: AnalysisService = new AnalysisService();

const server: net.Server = net.createServer((connection: net.Socket) => {

    // analysis code
    connection.on("data", async (data: Buffer) => {
        connection.write(analysisService.encodedRedisResponse(data));
    });

    // End the connection
    connection.on("close", () => {
        connection.end();
        server.close();
    });

});

server.listen(6379, "127.0.0.1");
