import { createInterface, type Interface } from "node:readline";
import { stdin, stdout} from "node:process"
import * as cli_commands from "./cli_commands.js"
import { PokeAPI } from "./pokeapi.js";
import { Pokemon } from "./pokeapi.js";
import { stringify } from "node:querystring";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, args: string[]) => Promise<void>;
}

export type State = {
    interface: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationsURL?: string;
    prevLocationsURL?: string;
    pokedex: Record<string, Pokemon>;
}

export function initState(): State 
{
    const replInterface = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > "
    });
    const state = {interface: replInterface, commands: getCommands(), api: new PokeAPI, pokedex: {}};
    return state;
}

export function getCommands(): Record<string, CLICommand>
{
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: cli_commands.commandExit
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: cli_commands.commandHelp
        },
        map: {
            name: "map",
            description: "Display poke locations",
            callback: cli_commands.commandMap
        },
        mapb: {
            name: "mapb",
            description: "Display previous poke locations",
            callback: cli_commands.commandMapb
        },
        explore: {
            name: "explore",
            description: "Display pokemon that can be encountered in an area",
            callback: cli_commands.commandExplore
        },
        catch: {
            name: "catch",
            description: "Attmpt to catch a pokemon",
            callback: cli_commands.commandCatch
        },
        inspect: {
            name: "inspect",
            description: "Inspect pokedex entry",
            callback: cli_commands.commandInspect
        },
    };
}