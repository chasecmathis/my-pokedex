import { Typography } from "@mui/material";

export default function Header() {
  const about =
    "The Pokédex section has a wealth of information on all the Pokémon creatures from the entire game series. On the main list pages, you can see the various stats of each Pokémon. Click a Pokémon's name to see a detailed page with Pokédex data, descriptions, sprites, evolutions, moves, and more!";
  return (
    <>
      <Typography
        variant="h4"
        align="center"
        color="text.primary"
        fontWeight="500"
        gutterBottom
      >
        MyPOKÉDEX
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        {about}
      </Typography>
    </>
  );
}
