import { Card, CardMedia, CardActionArea, Tooltip, Fade } from "@mui/material";

export default function PokemonAvatar({ team, pkmn, handleAdd }) {
  const full = team.every((pokemon) => pokemon !== null);

  return (
    <Tooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
      title={pkmn.name.charAt(0).toUpperCase() + pkmn.name.replace('-', ' ').slice(1)}
      arrow={true}
    >
      <Card
        variant="outlined"
        sx={{
          bgcolor: pkmn.types[0] + ".light",
          borderRadius: "50%",
          width: "75px",
          height: "75px",
          "&:hover": !full
            ? { animation: "shake 0.5s", animationIterationCount: "infinite" }
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
        <CardActionArea
          disableRipple
          disabled={full}
          onClick={(e) => handleAdd(e, pkmn)}
        >
          <CardMedia
            component="img"
            src={pkmn.sprites.front_default}
            alt={pkmn.name}
            align="center"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mx: "auto",
            }}
          />
        </CardActionArea>
      </Card>
    </Tooltip>
  );
}
