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

export async function commandInspect(state: State, args: string[])
{
    const pokemon = state.pokedex[args[1]];

    if(!pokemon)
    {
        console.log("you have not caught that pokemon");
        return;
    }
    let pokeStats: Record<string, number> = {};
    for(const stat of pokemon.stats)
    {
        pokeStats[stat.stat.name] = stat.base_stat;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    console.log(`   -hp: ${pokeStats["hp"]}`);
    console.log(`   -attack: ${pokeStats["attack"]}`);
    console.log(`   -defense: ${pokeStats["defense"]}`);
    console.log(`   -special-attack: ${pokeStats["special-attack"]}`);
    console.log(`   -special-defense: ${pokeStats["special-defense"]}`);
    console.log(`   -speed: ${pokeStats["speed"]}`);
    console.log("Types:");
    for(const type of pokemon.types)
    {
        console.log(`   - ${type.type.name}`)
    }

}