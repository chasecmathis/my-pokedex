import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

export default function SearchSelectBar({ onSearch, onChange, generations, generation }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        label="Search Pokémon"
        type="search"
        variant="standard"
        onChange={onSearch}
        sx={{ flexGrow: 1, marginRight: 2 }}
      />
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="generation-select-label">Generation</InputLabel>
        <Select
          labelId="generation-select-label"
          id="generation-select"
          value={generation}
          label="Generation"
          onChange={onChange}
        >
          <MenuItem key={"all"} value={"all"}>
            All
          </MenuItem>
          {generations.map((gen) => (
            <MenuItem key={gen} value={gen}>
              {`Gen ${gen.split("-")[1].toUpperCase()}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
