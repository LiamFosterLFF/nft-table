import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// This is a custom filter UI for selecting
// a unique option from a list
function SelectFilter({ filterValue, setFilter }) {
  // Calculate the options for filtering
  // using the preFilteredRows

  const options = [
    "All Time",
    "Last 30 seconds",
    "Last 24hr",
    "7 Days",
    "1 Month",
  ];

  // Render a multi-select box
  return (
    <FormControl variant="standard">
      <InputLabel></InputLabel>
      <Select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectFilter;
