import styled from "styled-components";

export const Styles = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  font-family: Poppins, sans-serif;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 1rem;

  .top-bar {
    display: flex;
    justify-content: center;
    div {
      margin: 0 50px;
    }
  }

  #standard-basic {
    text-align: left;
    width: 100%;
    margin: 0;
  }

  table {
    border-spacing: 0;
    width: 100vw;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-top: 1px solid rgb(229, 232, 235);

      input {
        font-weight: 800;
        text-align: right;
        width: 50%;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    div {
      margin: 0 10px;
    }
  }
`;
