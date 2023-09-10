"use client";
import { Container, Grid, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";

import TeamCard from "@/components/teams/TeamCard";
import SearchSelectBar from "@/components/filters/SearchSelectBar";
import TypeFilter from "@/components/filters/TypeFilter";
import PokemonAvatar from "@/components/teams/PokemonAvatar";
import TeamAnalysis from "@/components/teams/TeamAnalysis";

const pokemon = require("@/data/pokemon.json");
const generations = require("@/data/gens.json");
const pkmnTypes = require("@/data/types.json");

export default function Teams() {
  const perPage = 108;

  const [team, setTeam] = useState([null, null, null, null, null, null]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pkmn, setPkmn] = useState(pokemon);
  const [types, setTypes] = useState(
    pkmnTypes.map((type) => ({ name: type.name, checked: false }))
  );
  const [generation, setGeneration] = useState("all");

  useEffect(() => {
    setPkmn(
      pokemon.filter((pkmn) => {
        const selectedTypes = types
          .filter((type) => type.checked)
          .map((type) => type.name);
        return (
          (generation === "all" || pkmn.generation === generation) &&
          (selectedTypes.length === 0 ||
            selectedTypes.every((type) => pkmn.types.includes(type))) &&
          pkmn.name.replace("-", " ").includes(search) &&
          team.every((poke) => poke === null || poke.id !== pkmn.id)
        );
      })
    );

    setPage(1);
  }, [types, generation, search, team]);

  function handleSearch(e) {
    setSearch(e.target.value.toLowerCase().trim());
  }

  function handleGeneration(e) {
    setGeneration(e.target.value);
  }

  function handleTypes(e) {
    setTypes(
      types.map((type) =>
        type.name === e.target.name
          ? { ...type, checked: e.target.checked }
          : type
      )
    );
  }

  function handlePagination(e, value) {
    setPage(value);
  }

  function handleAdd(e, pkmn) {
    setTeam((prevTeam) => {
      // Create a copy of the array
      const newTeam = [...prevTeam];
      newTeam[newTeam.indexOf(null)] = pkmn;
      return newTeam;
    });
  }

  function handleDelete(e, pkmn) {
    setTeam((prevTeam) => {
      // Create a copy of the array
      const newTeam = [...prevTeam];
      newTeam.splice(newTeam.indexOf(pkmn), 1);
      newTeam.push(null);
      return newTeam;
    });
  }

  return (
    <main>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {team.map((pkmn, index) => (
            <Grid item key={index} xs={6} md={4} lg={2}>
              <TeamCard
                pokemon={pkmn}
                handleDelete={(e) => handleDelete(e, pkmn)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="md" color="">
        <TeamAnalysis team={team} />
        <SearchSelectBar
          onSearch={handleSearch}
          onChange={handleGeneration}
          generations={generations}
        />
        <TypeFilter types={types} onChange={handleTypes} />
      </Container>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={2}>
          {pkmn
            .slice((page - 1) * perPage, Math.min(pkmn.length, page * perPage))
            .map((pkmn) => (
              <Grid item key={pkmn.name} sm={3} md={1}>
                <PokemonAvatar
                  pkmn={pkmn}
                  team={team}
                  handleAdd={(e) => handleAdd(e, pkmn)}
                />
              </Grid>
            ))}
        </Grid>
        <Pagination
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          count={Math.ceil(pkmn.length / perPage)}
          page={page}
          onChange={handlePagination}
        />
      </Container>
    </main>
  );
}
