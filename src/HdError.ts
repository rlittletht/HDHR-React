
export class HdError extends Error
{
    _Messages: string[];

    constructor(messages: string[])
    {
        super(messages[0]);

        Object.setPrototypeOf(this, new.target.prototype);

        this._Messages = messages;
    }

    static linesFromError(error: any): string[]
    {
        if (error.stack)
            return [
                "Details:",
                `Exception caught: ${error.message}`,
                ...error.stack.split("\n")
            ];
        else
            return [
                "Details:",
                `Exception caught: ${error.message}`,
                "BAD DEVELOPER, no stack trace!"
            ];
    }
}