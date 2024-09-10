// import * as net from 'net';
// import RedisParser from 'redis-parser';
// enum CommonResponseCommand {
//   Pong = 'PONG',
// }
// console.log('Logs from your program will appear here!');
// const server: net.Server = net.createServer((connection: net.Socket) => {
//   const values = new Map();
//   const connectionParser = new RedisParser({
//     returnReply: (reply: string[]) => {
//       console.log('Received command:', JSON.stringify(reply));
//       const [command, ...args] = reply;
//       switch (command.toLowerCase()) {
//         case 'ping':
//           connection.write(encodeRedisResponse(CommonResponseCommand.Pong));
//           break;
//         case 'echo':
//           connection.write(`$${args[0].length}\r\n${args[0]}\r\n`);
//           break;
//         case 'set':
//           values.set(args[0], args[1]);
//           connection.write('+OK\r\n');
//           break;
//         case 'get':
//           const value = values.get(args[0]);
//           connection.write(
//             `$${value ? value.length + '\r\n' + value : '-1'}\r\n`
//           );
//           break;
//         default:
//           connection.write(`-ERR unknown command ${command}\r\n`);
//           break;
//       }
//     },
//     returnError: (error: unknown) => {
//       console.error('Error', error);
//     },
//     returnFatalError: (error: unknown) => {
//       console.error('Fatal Error', error);
//     },
//   });
//   connection.on('data', async (data: Buffer) => {
//     connectionParser.execute(data);
//   });
// });
// server.listen(6379, '127.0.0.1');
// function encodeRedisResponse(command: string) {
//   return `+${command}\r\n`;
// }