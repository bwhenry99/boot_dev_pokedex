import { get } from "node:http";
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache =  new Cache(30000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    if(pageURL)
    {
      const cached = this.cache.get(pageURL);
      if(cached)
      {
        return cached;
      }
      const response = fetch(pageURL);
      const result = (await response).json()
      this.cache.add(pageURL, result)
      return result;
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