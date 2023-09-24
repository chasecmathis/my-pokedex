"use client";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Typography,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from "@mui/material";
import React, { useState, useEffect } from "react";

const moves = require("@/data/moves.json");

export default function MovesTable({ pkmn }) {
  const [version, setVersion] = useState(pkmn.version_groups[0]);

  function handleChange(event) {
    setVersion(event.target.value);
  }

  function getAllMoves(moves) {
    const allMoves = [];
    moves.forEach((move) =>
      move.learn_details
        .filter((m) => m.game === version)
        .forEach((m) => allMoves.push({ name: move.name, level: m.level }))
    );

    return allMoves.sort((a, b) => a.level - b.level);
  }

  return (
    <>
      <Box display="flex" alignItems="center" gap={4}>
        <Typography variant="h5" fontWeight="500" paddingY={2}>
          Level-Up Moves
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120, textTransform: "capitalize" }} size="small">
          <InputLabel id="select-version-label">Version</InputLabel>
          <Select
            labelId="select-version-label"
            id="select-version-label"
            value={version}
            label="Version"
            onChange={handleChange}
            MenuProps={{ PaperProps: { sx: { maxHeight: "25%" } } }}
          >
            {pkmn.version_groups.map((ver) => (
              <MenuItem key={ver} value={ver} sx={{textTransform: "capitalize" }}>
                {ver}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer variant="outlined" component={Paper}>
        <Table size="small" aria-label="moves table">
          <TableHead sx={{ bgcolor: `${pkmn.types[0]}` + ".light" }}>
            <TableRow>
              <TableCell align="right">Level</TableCell>
              <TableCell align="left">Move</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="right">Power</TableCell>
              <TableCell align="right">Acc.</TableCell>
              <TableCell align="left">Desc.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllMoves(pkmn.moves).map((move) => {
              console.log(move);
              const moveData = moves.find((data) => data.name === move.name);
              return (
                <TableRow key={move.name + move.level}>
                  <TableCell align="right">{move.level}</TableCell>
                  <TableCell align="left" sx={{ textTransform: "capitalize" }}>
                    {move.name.replace("-", " ")}
                  </TableCell>
                  <TableCell align="left" sx={{ textTransform: "capitalize" }}>
                    <Chip
                      size="small"
                      label={moveData.type}
                      variant="filled"
                      sx={{
                        bgcolor: `${moveData.type}` + ".main",
                        color: "white",
                        border: 2,
                        borderColor: `${moveData.type}` + ".light",
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ textTransform: "capitalize" }}>
                    {moveData.category}
                  </TableCell>
                  <TableCell align="right">{moveData.power || "- -"}</TableCell>
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
