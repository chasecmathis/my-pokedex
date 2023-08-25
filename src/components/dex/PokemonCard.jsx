import * as React from "react";

import {
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Card,
} from "@mui/material";

export default function PokemonCard({ pokemon, handleOpen }) {
  return (
    <CardActionArea
      disableRipple
      onClick={(e) => handleOpen(e, pokemon)}
      sx={{ "&:hover": { transform: "scale3d(1.05, 1.05, 1)" } }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
          border: 2,
        }}
      >
        <CardHeader
          titleTypographyProps={{
            textTransform: "capitalize",
            fontWeight: 400,
          }}
          title={pokemon.name.replace("-", " ")}
          subheader={`No. ${pokemon.id}`}
          sx={{ flexGrow: 1, borderBottom: 2 }}
        />
        <CardContent sx={{ bgcolor: pokemon.types[0] + ".light", width: '100%', height: "200px" }}>
          <CardMedia
            component="img"
            image={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other["official-artwork"].front_default}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mx: "auto",
            }}
          />
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
