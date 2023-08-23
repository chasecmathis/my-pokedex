const fs = require("fs");

// Function to fetch the list of all Pokémon species
async function fetchAllSpecies() {
  const url = "https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch the list of Pokémon species");
    return [];
  }
}

// Function to fetch default Pokémon data for a given species URL
async function fetchDefaultPokemonData(speciesUrl) {
  try {
    const response = await fetch(speciesUrl);
    const speciesData = await response.json();
    const defaultPokemonUrl = speciesData.varieties.find(
      (variety) => variety.is_default
    ).pokemon.url;
    const defaultPokemonResponse = await fetch(defaultPokemonUrl);
    const defaultPokemonData = await defaultPokemonResponse.json();
    return {
      ...defaultPokemonData,
      ...speciesData,
    };
  } catch (error) {
    console.error(
      `Failed to fetch default Pokémon data for species URL: ${speciesUrl}`
    );
    return null;
  }
}

// Fetch and store data for all unique Pokémon species
async function fetchAllPokemon() {
  const allPokemon = [];

  const speciesList = await fetchAllSpecies();
  for (const species of speciesList) {
    const pokemonData = await fetchDefaultPokemonData(species.url);
    if (pokemonData) {
      const pokemonInfo = {
        name: pokemonData.name,
        id: pokemonData.id,
        types: pokemonData.types.map((typeData) => typeData.type.name),
        stats: pokemonData.stats,
        abilities: pokemonData.abilities.map(
          (abilityData) => abilityData.ability.name
        ),
        moves: pokemonData.moves
          .filter(
            (move) =>
              move.version_group_details.pop().move_learn_method.name ===
              "level-up"
          )
          .map((moveData) => moveData.move.name),
        sprites: pokemonData.sprites,
        // You can handle description, evolutions, generation, etc.
        description:
          pokemonData.flavor_text_entries.length !== 0
            ? pokemonData.flavor_text_entries.find(
                (desc) => desc.language.name === "en"
              ).flavor_text.replace('\f', '')
            : null,
        generation: pokemonData.generation.name,
        evolves_from: pokemonData.evolves_from_species
          ? pokemonData.evolves_from_species.name
          : null,
      };

      allPokemon.push(pokemonInfo);
    }
  }

  fs.writeFileSync("pokemon.json", JSON.stringify(allPokemon, null, 4));
  console.log("Finished fetching pokemon");
}

// Fetch all type data
async function fetchTypes() {
  const url = "https://pokeapi.co/api/v2/type";
  try {
    const response = await fetch(url);
    const typeData = await response.json();
    return typeData.results
      .map((type) => type.name)
      .filter((name) => name !== "shadow" && name !== "unknown");
  } catch (e) {
    console.error(
      `Failed to fetch default Pokémon data for type URL: ${url}`,
      e
    );
    return [];
  }
}

async function fetchAllTypes() {
  const types = await fetchTypes();
  fs.writeFileSync("types.json", JSON.stringify(types, null, 4));
  console.log("Finished fetching types");
}

// Fetch all generation data
async function fetchGenerations() {
  const url = "https://pokeapi.co/api/v2/generation";
  try {
    const response = await fetch(url);
    const generationData = await response.json();
    return generationData.results.map((generation) => generation.name);
  } catch (e) {
    console.error(
      `Failed to fetch default Pokémon data for generation URL: ${url}`,
      e
    );
    return [];
  }
}

async function fetchAllGenerations() {
  const gens = await fetchGenerations();
  fs.writeFileSync("gens.json", JSON.stringify(gens, null, 4));
  console.log("Finished fetching generations");
}

fetchAllPokemon();
fetchAllTypes();
fetchAllGenerations();

