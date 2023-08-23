import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Box,
  Chip,
  LinearProgress,
  Container,
  Typography,
} from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { Close } from "@mui/icons-material";
import * as Color from "@mui/material/colors";

export default function PokemonWindow({ handleClose, windowPkmn }) {

  if (windowPkmn === null) return null;

  const MIN = 0;
  const MAX = 255;

  const normalize = (value) => ((value - MIN) * 100) / (MAX - MIN);

  const statColor = (value) =>
    value < 25
      ? Color.red[400]
      : value < 50
      ? Color.orange[400]
      : value < 100
      ? Color.amber[400]
      : value < 125
      ? Color.lightGreen[400]
      : value < 150
      ? Color.green[400]
      : Color.teal[400];

  return (
    <Dialog
      open={windowPkmn !== null}
      maxWidth={{ xs: "xs", md: "md" }}
      fullWidth
      color="error"
    >
      <DialogTitle
        variant={{ xs: "h6", md: "h4" }}
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
              sx={{ ml: 1 }}
            />
          ))}
        </Box>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ display: "flex", alignItems: "center", mb: 1 }}
      >
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
          {windowPkmn.stats.map((stat) => (
            <Box key={stat.stat.name} sx={{ alignItems: "center", mb: "5px" }}>
              <Typography variant="button" sx={{ minWidth: 120 }}>
                {stat.stat.name.toUpperCase()}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "100%", mr: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={normalize(stat.base_stat)}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      [`&.${linearProgressClasses.colorPrimary}`]: {
                        backgroundColor: Color.grey[200],
                      },
                      [`& .${linearProgressClasses.bar}`]: {
                        borderRadius: 5,
                        backgroundColor: statColor(stat.base_stat),
                      },
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {stat.base_stat}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Container>
      </DialogContent>
      <DialogContent>
        <DialogContentText>{windowPkmn.description}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
