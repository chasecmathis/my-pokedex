import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ p: 4 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        MewDex
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Data gathered from the PokéAPI
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Report bugs to chase.mathis313@gmail.com
      </Typography>
    </Box>
  );
}
