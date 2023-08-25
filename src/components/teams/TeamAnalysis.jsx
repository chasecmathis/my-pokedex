"use client";
import { Close, Check, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Grid,
  Chip,
} from "@mui/material";

const types = require("@/data/types.json");

export default function TeamAnalysis({ team }) {
  function calcDefense(type) {
    let defense = 0;
    team.forEach((pkmn) => {
      if (pkmn === null) return;

      let first = false;

      pkmn.types.forEach((pkmnType) => {
        if (type.double_damage_to.some((weak) => weak.name === pkmnType)) {
          --defense;
          first = true;
        } else if (
          type.half_damage_to.some((strong) => strong.name === pkmnType) ||
          (type.no_damage_to.some((none) => none.name === pkmnType) && !first)
        )
          defense += 2;
        else if (
          type.no_damage_to.some((none) => none.name === pkmnType) &&
          first
        )
          defense += 3;
      });
    });

    return defense >= 0;
  }

  return (
    <Container sx={{ pb: 5 }}>
      <Accordion variant="outlined">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography
            sx={{ width: "33%", flexShrink: 0, color: "text.secondary" }}
          >
            Team Analysis
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {types.map((type) => (
              <Grid
                item
                key={type.name}
                sm={4}
                md={2}
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: 'center'
                }}
              >
                <Chip
                  key={type.name}
                  label={type.name}
                  sx={{
                    minWidth: 80,
                    bgcolor: `${type.name}` + ".main",
                    color: "white",
                    border: 2,
                    borderColor: `${type.name}` + ".light",
                    fontWeight: 500,
                    mr: "6px"
                  }}
                />

                {calcDefense(type.damage_relations) ? (
                  <Check color="success" />
                ) : (
                  <Close color="error" />
                )}
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
