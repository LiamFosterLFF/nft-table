import React from "react";
import { useTable, useFilters, usePagination } from "react-table";
import TablePagination from "./TablePagination";
import EditableCell from "./cells/EditableCell";
import ColumnFilter from "./filters/ColumnFilter";
import ProjectCell from "./cells/ProjectCell";

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ data, updateMyData, getNextPage, pageNo, skipPageReset }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Project Name",
        accessor: "projectName",
        Filter: ColumnFilter,
        Cell: ProjectCell,
      },
      {
        Header: "Volume",
        accessor: "volume",
      },
      {
        Header: "24hr %",
        accessor: "twentyFourHour",
      },
      {
        Header: "7d %",
        accessor: "sevenDay",
      },
      {
        Header: "Floor Price",
        accessor: "floorPrice",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: pageNo,
      },

      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    useFilters,
    usePagination
  );

  React.useEffect(() => {
    if ((pageIndex + 1) * pageSize > data.length) {
      getNextPage(pageIndex);
    }
  }, [pageIndex, pageSize, data]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>
                    {column.Filter
                      ? column.render("Filter")
                      : column.render("Header")}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination
        pageCount={pageCount}
        gotoPage={gotoPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
}

export default Table;
