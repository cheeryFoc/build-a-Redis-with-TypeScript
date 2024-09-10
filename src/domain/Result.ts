export class Result {

    static ok(context: string): string {
        return `+${context}\r\n`;
    }

    static error(context: string): string {
        return `+${context}\r\n`;
    }

}