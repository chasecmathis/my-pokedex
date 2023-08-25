import { Typography, Box, LinearProgress, Divider } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import * as Color from "@mui/material/colors";

export default function BaseStats({ pkmn }) {
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
    <>
      <Typography variant="h5" fontWeight="500" gutterBottom>
        Base Stats
      </Typography>
      {pkmn.stats.map((stat) => (
        <div key={stat.name}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "4px",
              mt: "4px",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 150 }}
            >
              {stat.name.toUpperCase()}
            </Typography>
            <Box sx={{ minWidth: 50 }}>
              <Typography variant="button" color="text.secondary">
                {stat.base_stat}
              </Typography>
            </Box>
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
          </Box>
          <Divider />
        </div>
      ))}
    </>
  );
}
