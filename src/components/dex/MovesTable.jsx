import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Typography
} from "@mui/material";

const moves = require("@/data/moves.json");

export default function MovesTable({ pkmn }) {
  return (
    <>
      <Typography variant="h5" fontWeight="500" paddingY={2}>
        Level-Up Moves
      </Typography>
      <TableContainer variant="outlined" component={Paper}>
        <Table size="small" aria-label="moves table">
          <TableHead sx={{ bgcolor: `${pkmn.types[0]}` + ".light" }}>
            <TableRow>
              <TableCell align="right">Level</TableCell>
              <TableCell align="right">Move</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Power</TableCell>
              <TableCell align="right">Acc.</TableCell>
              <TableCell align="left">Desc.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pkmn.moves
              .sort((a, b) => a.level - b.level)
              .map((move) => {
                const moveData = moves.find((data) => data.name === move.name);
                return (
                  <TableRow key={move.name}>
                    <TableCell align="right">{move.level}</TableCell>
                    <TableCell
                      align="right"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {move.name.replace("-", " ")}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ textTransform: "capitalize" }}
                    >
                      <Chip
                        size="small"
                        label={moveData.type}
                        variant="filled"
                        sx={{
                          bgcolor: `${moveData.type}` + ".main",
                          color: "white",
                          border: 2,
                          borderColor: `${moveData.type}` + ".light",
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {moveData.category}
                    </TableCell>
                    <TableCell align="right">
                      {moveData.power || "- -"}
                    </TableCell>
                    <TableCell align="right">
                      {moveData.accuracy || "- -"}
                    </TableCell>
                    <TableCell align="left">{moveData.description}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
