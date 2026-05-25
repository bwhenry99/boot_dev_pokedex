
export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
}

export function getCommands(): Record<string, CLICommand>
{
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        }
    };
}

export function commandExit()
{
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
}

export function commandHelp()
{
    console.log("Welcome to the Pokedex!\nUsage:\n");
    const commands = getCommands()
    for(const command in commands)
    {
        console.log(`${commands[command].name}: ${commands[command].description}`)
    }
}