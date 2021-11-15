import React from "react";
import TextField from "@mui/material/TextField";

function ColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
  const count = preFilteredRows.length;

  return (
    <TextField
      id="standard-basic"
      label="Project Name"
      variant="standard"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    />
  );
}

export default ColumnFilter;
