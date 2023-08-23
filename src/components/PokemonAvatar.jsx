import React from "react";
import { Card, CardMedia, CardActionArea, Tooltip, Fade } from "@mui/material";

export default function PokemonAvatar({ team, pkmn, handleAdd }) {
  const full = team.every((pokemon) => pokemon !== null);

  return (
    <Tooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
      title={
        pkmn.name.charAt(0).toUpperCase() + pkmn.name.replace("-", " ").slice(1)
      }
    >
      <CardActionArea
        disableRipple
        disabled={full}
        onClick={(e) => handleAdd(e, pkmn)}
      >
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            bgcolor: pkmn.types[0] + ".light",
            border: 1,
            borderColor: pkmn.types[0] + ".main",
            borderRadius: "10%",
            width: "85px",
            height: "85px",
            "&:hover": !full
              ? { animation: "shake 0.5s" }
              : { cursor: "not-allowed" },
            "@keyframes shake": {
              "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
              "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
              "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
              "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
              "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
              "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
              "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
              "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
              "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
              "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
              "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
            },
          }}
        >
          <CardMedia
            component="img"
            src={pkmn.sprites.front_default}
            alt={pkmn.name}
            sx={{
              width: "75%",
              height: "75%",
              objectFit: "contain",
              mx: "auto",
            }}
          />
        </Card>
      </CardActionArea>
    </Tooltip>
  );
}
