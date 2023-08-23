import {
  Container,
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";

import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import Link from "next/link";

const pages = ["Teams"];

export default function Nav() {
  return (
    <AppBar color="primary" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CatchingPokemonIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyPOKÉDEX
          </Typography>
          <Box>
            {pages.map((page) => (
              <Button
                component={Link}
                href={`/${page.toLowerCase()}`}
                variant="text"
                key={page}
                sx={{ color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
