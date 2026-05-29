import { get } from "node:http";
import { AsymmetricMatchersContaining } from "vitest";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    if(pageURL)
    {
      const response = fetch(pageURL);
      return (await response).json();
    }
    const response = fetch(`${PokeAPI.baseURL}/location-area/`);
    return (await response).json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    return get(`${PokeAPI.baseURL}/location/${locationName}`)
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: [{
    name: string;
    url: string;
  }];
};

export type Location = {
  // add properties here
};