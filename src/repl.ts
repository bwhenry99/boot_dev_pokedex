import * as cliCommands from "./cli_commands.js"
import {State} from "./state.js"

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

export function startREPL(state: State)
{
    state.interface.prompt();
    state.interface.on("line", async (input) => {
        const clean = cleanInput(input);
        if(!input) {
            state.interface.prompt();
        }
        else {
            if(state.commands[clean[0]])
            {
                try{
                await state.commands[clean[0]].callback(state);
                state.interface.prompt();
                }
                catch(error) {
                    if(error instanceof Error) {
                        console.log(error.message);
                    }
                }
                
            }
            else
            {
                console.log("Unknown command")
                state.interface.prompt();
            }
        }
    });
}
