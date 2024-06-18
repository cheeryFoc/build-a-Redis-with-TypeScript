import * as net from "net";
import { AnalysisService } from '@/service/AnalysisService';
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

let analysisService: AnalysisService = new AnalysisService();

// Uncomment this block to pass the first stage
const server: net.Server = net.createServer((connection: net.Socket) => {
    connection.on("data", async (data: Buffer) => {
        connection.write(analysisService.encodedRedisResponse(data));
    });
});

server.listen(6379, "127.0.0.1");
