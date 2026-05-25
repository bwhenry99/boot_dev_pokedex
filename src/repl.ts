import * as readline from "node:readline/promises";
import { stdin, stdout} from "node:process"
import * as cliCommands from "./cli_commands.js"
import { recordArtifact } from "vitest";

export function cleanInput(input: string): string[]
{
    const words = input.trim().split(' ');
    let cleanWords: string[] = [];

    for(let word of words)
    {
        const cleanword = word.trim().toLowerCase();
        if(cleanword)
        {
            cleanWords.push(word.trim().toLowerCase())
        }
    }

    return cleanWords;
}

export function startREPL()
{
    const replInterface = readline.createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > "
    });

    replInterface.prompt();
    replInterface.on("line", (input) => {
        const clean = cleanInput(input);
        if(!input) {
            replInterface.prompt();
        }
        else {
            const commands = cliCommands.getCommands();
            if(commands[clean[0]])
            {
                commands[clean[0]].callback(commands);
                replInterface.prompt();
            }
            else
            {
                console.log("Unknown commnad")
                replInterface.prompt();
            }
        }
    });
}
