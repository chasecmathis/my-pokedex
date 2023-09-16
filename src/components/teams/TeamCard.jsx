import * as React from "react";
import {
  Container,
  CardMedia,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";

import { DeleteOutline } from "@mui/icons-material";

export default function TeamCard({ pokemon, handleDelete }) {
  return (
    <Card
      sx={{
        border: 2,
        borderRadius: "10%",
      }}
    >
      <CardContent
        sx={{
          backgroundColor:
            pokemon === null ? "primary.light" : pokemon.types[0] + ".light",
          width: "100%",
          height: "125px",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleDelete}
          disabled={pokemon === null}
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            padding: "2px",
          }}
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
        <CardMedia
          component="img"
          src={
            pokemon === null
              ? "/assets/images/egg.png"
              : pokemon.sprites.other["official-artwork"].front_default
          }
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            mx: "auto",
          }}
        />
      </CardContent>
      <CardContent
        sx={{
          borderTop: 2,
          textTransform: "capitalize",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, textAlign: "center" }}
        >
          {pokemon === null ? "???" : pokemon.name.replace("-", " ")}
        </Typography>
        {pokemon !== null ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: "4px",
            }}
          >
            {pokemon.types.map((t) => (
              <Chip
                key={t}
                color={t}
                label={t}
                variant="outlined"
                size="small"
                sx={{ ml: "6px", fontWeight: 500 }}
              />
            ))}
          </Container>
        ) : null}
      </CardContent>
    </Card>
  );
}
