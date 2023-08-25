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
      delete pokemonData.sprites.versions;
      const pokemonInfo = {
        name: pokemonData.name,
        id: pokemonData.id,
        types: pokemonData.types.map((typeData) => typeData.type.name),
        stats: pokemonData.stats.map((stat) => ({
          base_stat: stat.base_stat,
          name: stat.stat.name,
        })),
        abilities: pokemonData.abilities.map(
          (abilityData) => abilityData.ability.name
        ),
        moves: pokemonData.moves
          .filter((move) =>
            move.version_group_details.some(
              (move) => move.move_learn_method.name === "level-up"
            )
          )
          .map((moveData) => ({
            name: moveData.move.name,
            level: moveData.version_group_details.findLast(
              (move) => move.move_learn_method.name === "level-up"
            ).level_learned_at,
          })),
        sprites: pokemonData.sprites,
        // You can handle description, evolutions, generation, etc.
        description:
          pokemonData.flavor_text_entries.length !== 0
            ? pokemonData.flavor_text_entries.find(
                (desc) => desc.language.name === "en"
              ).flavor_text
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

async function fetchTypeData(typeUrl) {
  try {
    const response = await fetch(typeUrl);
    const typeData = await response.json();
    return typeData;
  } catch (e) {
    console.error(
      `Failed to fetch default Pokémon data for type URL: ${url}`,
      e
    );
    return null;
  }
}

// Fetch all type data
async function fetchTypes() {
  const url = "https://pokeapi.co/api/v2/type";
  try {
    const response = await fetch(url);
    const typeData = await response.json();
    return typeData.results.filter(
      (type) => type.name !== "shadow" && type.name !== "unknown"
    );
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
  const typeInfo = [];
  for (const type of types) {
    const typeData = await fetchTypeData(type.url);
    if (typeData) {
      const type = {
        name: typeData.name,
        damage_relations: typeData.damage_relations,
      };

      typeInfo.push(type);
    }
  }
  fs.writeFileSync("types.json", JSON.stringify(typeInfo, null, 4));
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

async function fetchMoveData(moveUrl) {
  try {
    const response = await fetch(moveUrl);
    const moveData = await response.json();
    return moveData;
  } catch (e) {
    console.error(
      `Failed to fetch default Pokémon data for move URL: ${url}`,
      e
    );
    return null;
  }
}

// Fetch all type data
async function fetchMoves() {
  const url = "https://pokeapi.co/api/v2/move?limit=100000&offset=0";
  try {
    const response = await fetch(url);
    const moveData = await response.json();
    return moveData.results;
  } catch (e) {
    console.error(
      `Failed to fetch default Pokémon data for move URL: ${url}`,
      e
    );
    return [];
  }
}

async function fetchAllMoves() {
  const moves = await fetchMoves();
  const moveInfo = [];
  for (const move of moves) {
    const moveData = await fetchMoveData(move.url);
    if (moveData && moveData.type.name !== 'shadow') {
      const descripion = moveData.effect_entries.find(
        (entry) => entry.language.name === "en"
      );
      const move = {
        name: moveData.name,
        accuracy: moveData.accuracy,
        power: moveData.power,
        type: moveData.type.name,
        category: moveData.damage_class.name,
        description: descripion
          ? descripion.short_effect.replace("$effect_chance% ", "")
          : "No description",
      };

      moveInfo.push(move);
    }
  }
  fs.writeFileSync("moves.json", JSON.stringify(moveInfo, null, 4));
  console.log("Finished fetching moves");
}

function fetchData() {
  fetchAllMoves();
  fetchAllPokemon();
  fetchAllTypes();
  fetchAllGenerations();
}

fetchData();
