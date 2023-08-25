import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import {
  CatchingPokemonRounded,
  CatchingPokemonTwoTone,
} from "@mui/icons-material";

export default function TypeFilter({ types, onChange }) {
  return (
    <FormGroup
      row
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        mt: 3,
      }}
    >
      {types.map((type) => (
        <FormControlLabel
          key={type.name}
          control={
            <Checkbox
              checked={type.checked}
              onChange={onChange}
              icon={<CatchingPokemonTwoTone />}
              checkedIcon={<CatchingPokemonRounded />}
              name={type.name}
            />
          }
          label={type.name}
          sx={{ minWidth: "140px", textTransform: "capitalize" }}
        />
      ))}
    </FormGroup>
  );
}
