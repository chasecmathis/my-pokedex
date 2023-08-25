import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Box,
  Chip,
  Container,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import MovesTable from "./MovesTable";
import BaseStats from "./BaseStats";

export default function PokemonWindow({ handleClose, windowPkmn }) {
  if (windowPkmn === null) return null;

  return (
    <Dialog open={windowPkmn !== null} maxWidth="lg" fullWidth color="error">
      <DialogTitle
        variant="h5"
        fontWeight="500"
        align="center"
        sx={{
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {windowPkmn.name}
          {windowPkmn.types.map((t) => (
            <Chip
              key={t}
              color={t}
              label={t}
              variant="outlined"
              sx={{ ml: 1, fontWeight: 500 }}
            />
          ))}
        </Box>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box
            component="img"
            sx={{
              height: { xs: "50%", md: "25%" },
              width: { xs: "50%", md: "25%" },
            }}
            alt={windowPkmn.name}
            src={windowPkmn.sprites.other["official-artwork"].front_default}
          />
          <Container sx={{ flex: 1, ml: 2 }}>
            <BaseStats pkmn={windowPkmn} />
          </Container>
        </Box>
        <DialogContentText sx={{ py: 2 }}>
          {windowPkmn.description}
        </DialogContentText>
        <Divider variant="middle" />
        <MovesTable pkmn={windowPkmn} />
      </DialogContent>
    </Dialog>
  );
}
