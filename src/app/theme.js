import { createTheme } from "@mui/material";

const newColor = (name, main, light) => {
  return theme.palette.augmentColor({
    color: { main: main, light: light },
    name: name,
  });
};

let theme = createTheme({
  palette: {
    contrastThreshold: 3.0,
  },
});

export default theme = createTheme(theme, {
  palette: {
    primary: { main: "#ee1515", light: "#fde8e8" },
    normal: newColor("normal", "#A8A77A", "#dcdcca"),
    fire: newColor("fire", "#EE8130", "#f8cdac"),
    water: newColor("water", "#6390F0", "#c1d3f9"),
    electric: newColor("electric", "#F7D02C", "#fcecab"),
    grass: newColor("grass", "#7AC74C", "#cae9b7"),
    ice: newColor("ice", "#96D9D6", "#d5f0ef"),
    fighting: newColor("fighting", "#C22E28", "#eca6a3"),
    poison: newColor("poison", "#A33EA1", "#e0acdf"),
    ground: newColor("ground", "#E2BF65", "#f3e5c1"),
    flying: newColor("flying", "#A98FF3", "#ddd2fa"),
    psychic: newColor("psychic", "#F95587", "#fdbbcf"),
    bug: newColor("bug", "#A6B91A", "#e5f096"),
    rock: newColor("rock", "#B6A136", "#e6dcaa"),
    ghost: newColor("ghost", "#735797", "#c7bad7"),
    dragon: newColor("dragon", "#6F35FC", "#c5aefe"),
    dark: newColor("dark", "#705746", "#cdbbae"),
    steel: newColor("steel", "#B7B7CE", "#e2e2eb"),
    fairy: newColor("fairy", "#D685AD", "#efcede"),
  },
});
