import * as net from "node:net";
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
enum State {
  PONG = "+PONG\r\n",
}
// Uncomment this block to pass the first stage
const server: net.Server = net.createServer((connection: net.Socket) => {
  const database: Record<string, string> = {};
  connection.on('data', data => {
    const [numOfargs, ...args] = data.toString().split("\r\n");
    const [commandLength, command, ...params] = args;
    let response = "";
    switch (command.toLocaleLowerCase()) {
      case 'ping':
        connection.write(State.PONG);
        break;
      case 'echo':
        console.log(args)
        response = `$${args[3].length}\r\n${args[3]}\r\n`;
        connection.write(response)
        break;
      case 'set':
        database[args[3]] = args[5];
        response = `+OK\r\n`;
        connection.write(response);
        break;
      case 'get':
        response = `$${database[args[3]].length}\r\n${database[args[3]]}\r\n`;
        connection.write(response);
        break;
      default:
        connection.write(State.PONG);
        break;
    }
  })
});
server.listen(6379, "127.0.0.1");