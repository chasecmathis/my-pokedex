"use client";
import React, { useEffect, useState } from "react";

import { Pagination, Container, Box, Grid } from "@mui/material";

const pokemon = require("../data/pokemon.json");
const generations = require("../data/gens.json");
const pkmnTypes = require("../data/types.json");

import PokemonCard from "../components/PokemonCard";
import SearchSelectBar from "../components/SearchSelectBar";
import TypeFilter from "../components/TypeFilter";
import PokemonWindow from "../components/PokemonWindow";
import Header from "../components/Header";

export default function Home() {
  const perPage = 100;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pkmn, setPkmn] = useState(pokemon);
  const [types, setTypes] = useState(
    pkmnTypes.map((type) => ({ name: type, checked: false }))
  );
  const [generation, setGeneration] = useState("all");
  const [windowPkmn, setWindowPkmn] = useState(null);

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
          pkmn.name.includes(search)
        );
      })
    );

    setPage(1);
  }, [types, generation, search]);

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

  function handleOpen(e, pkmn) {
    setWindowPkmn(pkmn);
  }

  function handleClose() {
    setWindowPkmn(null);
  }

  return (
    <main>
      <Box sx={{ py: 5 }}>
        <Container maxWidth="md">
          <Header />
          <SearchSelectBar
            onSearch={handleSearch}
            onChange={handleGeneration}
            generations={generations}
          />
          <TypeFilter types={types} onChange={handleTypes} />
        </Container>
      </Box>
      <Container sx={{ py: 2 }} maxWidth="lg">
        <Grid container spacing={6}>
          {pkmn
            .slice((page - 1) * perPage, Math.min(pkmn.length, page * perPage))
            .map((pkmn) => (
              <Grid item key={pkmn.name} xs={12} sm={6} md={3}>
                <PokemonCard
                  pokemon={pkmn}
                  handleOpen={(e) => handleOpen(e, pkmn)}
                />
              </Grid>
            ))}
        </Grid>
        <PokemonWindow handleClose={handleClose} windowPkmn={windowPkmn} />
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
