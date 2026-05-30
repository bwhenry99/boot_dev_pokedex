import { PokeAPI } from "./pokeapi.js";
import {State} from "./state.js"

export async function commandExit()
{
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
}

export async function commandHelp(state: State)
{
    console.log("Welcome to the Pokedex!\nUsage:\n");
    for(const cmd in state.commands)
    {
        console.log(`${state.commands[cmd].name}: ${state.commands[cmd].description}`)
    }
}

export async function commandMap(state: State)
{
    const locations = await state.api.fetchLocations(state.nextLocationsURL);
    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;

    for(const location of locations.results)
    {
        console.log(location.name);
    }
}

export async function commandMapb(state: State)
{
    if(!state.prevLocationsURL)
    {
        console.log("you're on the first page");
        return;
    }
    const locations = await state.api.fetchLocations(state.prevLocationsURL);
    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;

    for(const location of locations.results)
    {
        console.log(location.name);
    }
}

export async function commandExplore(state: State, args: string[])
{
    const data = await state.api.fetchLocation(args[1]);
    console.log(`Exploring ${args[1]}...`);
    console.log("Found Pokemon:")
    for (const pokemon of data.pokemon_encounters)
    {
        console.log(`- ${pokemon.pokemon.name}`);
    }
}

export async function commandCatch(state: State, args: string[])
{
    const pokemon = await state.api.fetchPokemon(args[1]);
    console.log(`Throwing a Pokeball at ${args[1]}...`);
    
    const roll = Math.floor(Math.random() * 400);

    if(roll >  pokemon.base_experience)
    {
        console.log(`${args[1]} was caught!`);
        state.pokedex[args[1]] = pokemon;
    }
    else
    {
        console.log(`${args[1]} escaped!`);
    }
}