import React from "react";

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const includePercent = id === "twentyFourHour" || id === "sevenDay";
  return (
    <div
      style={{
        display: "flex",
        color: includePercent
          ? value.slice(0, 1) === "-"
            ? "red"
            : "green"
          : "black",
      }}
    >
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ color: "inherit" }}
      />
      {includePercent ? "%" : ""}
    </div>
  );
};

export default EditableCell;
