import * as readline from "node:readline/promises";
import { stdin, stdout} from "node:process"

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
            console.log(`Your command was: ${clean[0]}`);
            replInterface.prompt();
        }
    });
}