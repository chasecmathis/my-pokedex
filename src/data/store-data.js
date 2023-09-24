const fs = require("fs");

async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data from URL: ${url}`);
    return null;
  }
}

async function fetchAllPokemon() {
  const allPokemon = [];

  const speciesList = await fetchJSON(
    "https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0"
  );
  if (!speciesList) return;

  for (const species of speciesList.results) {
    const speciesData = await fetchJSON(species.url);
    if (!speciesData) continue;

    const defaultPokemonUrl = speciesData.varieties.find(
      (variety) => variety.is_default
    ).pokemon.url;
    const defaultPokemonData = await fetchJSON(defaultPokemonUrl);
    if (!defaultPokemonData) continue;

    // Pokemon Info
    const pokemonInfo = {
      name: defaultPokemonData.name,
      id: defaultPokemonData.id,
      types: defaultPokemonData.types.map((typeData) => typeData.type.name),
      stats: defaultPokemonData.stats.map((stat) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
      })),
      abilities: defaultPokemonData.abilities.map(
        (abilityData) => abilityData.ability.name
      ),
      moves: [], // Placeholder for moves
      version_groups: [], // Placeholder for version groups
      sprites: defaultPokemonData.sprites,
      description:
        speciesData.flavor_text_entries.length !== 0
          ? speciesData.flavor_text_entries
              .find((desc) => desc.language.name === "en")
              .flavor_text.replace("\f", " ")
          : null,
      generation: speciesData.generation.name,
      evolves_from: speciesData.evolves_from_species
        ? speciesData.evolves_from_species.name
        : null,
    };

    // Fetch and store level up moves

    const levelUpMoves = defaultPokemonData.moves.filter((move) =>
      move.version_group_details.some(
        (move) => move.move_learn_method.name === "level-up"
      )
    );

    const moves = levelUpMoves.map((moveData) => {
      const moveLearnDetails = moveData.version_group_details
        .filter((move) => move.move_learn_method.name === "level-up")
        .map((move) => ({
          game: move.version_group.name,
          level: move.level_learned_at,
        }));
      return {
        name: moveData.move.name,
        learn_details: moveLearnDetails,
      };
    });

    // Create an array to store unique version groups
    const versionGroups = [
      ...new Set(
        moves.flatMap((move) => move.learn_details.map((detail) => detail.game))
      ),
    ];

    pokemonInfo.moves = moves;
    pokemonInfo.version_groups = versionGroups;

    console.log(pokemonInfo.name);
    allPokemon.push(pokemonInfo);
  }

  fs.writeFileSync("pokemon.json", JSON.stringify(allPokemon, null, 4));
  console.log("Finished fetching pokemon");
}

async function fetchTypeData(typeUrl) {
  return await fetchJSON(typeUrl);
}

async function fetchTypes() {
  const typeData = await fetchJSON("https://pokeapi.co/api/v2/type");
  if (!typeData) return [];

  return typeData.results.filter(
    (type) => type.name !== "shadow" && type.name !== "unknown"
  );
}

async function fetchAllTypes() {
  const types = await fetchTypes();
  const typeInfo = [];

  for (const type of types) {
    const typeData = await fetchTypeData(type.url);
    if (!typeData) continue;

    const typeInfoObj = {
      name: typeData.name,
      damage_relations: typeData.damage_relations,
    };

    typeInfo.push(typeInfoObj);
  }

  fs.writeFileSync("types.json", JSON.stringify(typeInfo, null, 4));
  console.log("Finished fetching types");
}

async function fetchGenerations() {
  const generationData = await fetchJSON(
    "https://pokeapi.co/api/v2/generation"
  );
  if (!generationData) return [];

  return generationData.results.map((generation) => generation.name);
}

async function fetchAllGenerations() {
  const gens = await fetchGenerations();
  fs.writeFileSync("gens.json", JSON.stringify(gens, null, 4));
  console.log("Finished fetching generations");
}

async function fetchMoveData(moveUrl) {
  return await fetchJSON(moveUrl);
}

async function fetchMoves() {
  const moveData = await fetchJSON(
    "https://pokeapi.co/api/v2/move?limit=100000&offset=0"
  );
  if (!moveData) return [];

  return moveData.results;
}

async function fetchAllMoves() {
  const moves = await fetchMoves();
  const moveInfo = [];

  for (const move of moves) {
    const moveData = await fetchMoveData(move.url);
    if (!moveData || moveData.type.name === "shadow") continue;

    const description = moveData.effect_entries.find(
      (entry) => entry.language.name === "en"
    );

    const moveInfoObj = {
      name: moveData.name,
      accuracy: moveData.accuracy,
      power: moveData.power,
      type: moveData.type.name,
      category: moveData.damage_class.name,
      description: description
        ? description.short_effect.replace("$effect_chance% ", "")
        : "No description",
    };

    moveInfo.push(moveInfoObj);
  }

  fs.writeFileSync("moves.json", JSON.stringify(moveInfo, null, 4));
  console.log("Finished fetching moves");
}

async function fetchData() {
  // await fetchAllMoves();
  await fetchAllPokemon();
  await fetchAllTypes();
  await fetchAllGenerations();
}

fetchData();
