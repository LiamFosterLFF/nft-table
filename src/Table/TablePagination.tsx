import {
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const TablePagination = ({ pageCount, gotoPage, pageSize, setPageSize }) => {
  return (
    <div className="pagination">
      <span>
        <Pagination
          count={pageCount}
          variant="outlined"
          color="primary"
          onChange={(e, value) => gotoPage(value - 1)}
        />
      </span>
      <span>
        <FormControl variant="standard">
          <InputLabel></InputLabel>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                Show {pageSize}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </span>
    </div>
  );
};

export default TablePagination;
