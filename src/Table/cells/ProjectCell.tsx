import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

export const Styles = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 5px;
  }
`;

const ProjectCell = (props) => {
  return (
    <Styles>
      <span>{props.row.original.index} </span>
      <span>
        <Avatar alt={props.value} src={props.row.original.imageUrl} />
      </span>
      <span>{props.value}</span>
    </Styles>
  );
};

export default ProjectCell;
