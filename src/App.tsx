import React from "react";
import Button from "@mui/material/Button";

import { Styles } from "./styles/app";
import Table from "./Table";
import { useProjects } from "./hooks/useProjects";
import SelectFilter from "./Table/filters/SelectFilter";

function TableComponent() {
  const [
    data,
    originalData,
    setData,
    getNextPage,
    pageNo,
    filterValue,
    setFilter,
  ] = useProjects();

  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  return (
    <Styles
      id="App
    "
    >
      <div className="top-bar">
        <Button size="small" onClick={resetData}>
          Reset Data
        </Button>
        <SelectFilter filterValue={filterValue} setFilter={setFilter} />
      </div>

      <Table
        data={data}
        updateMyData={updateMyData}
        getNextPage={getNextPage}
        pageNo={pageNo}
        skipPageReset={skipPageReset}
      />
    </Styles>
  );
}

export default TableComponent;
