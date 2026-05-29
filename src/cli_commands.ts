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