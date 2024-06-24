import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  tableStyle: {
    background: "white",
    width: "70%",
    margin: "auto",
    marginTop: "3em",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
  },
  plusIcon: {
    background: "#fff",
    width: "70%",
    margin: "auto",
    marginTop: "1em",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
  },
  head: {
    background: "rgb(111, 143, 175)",
    color: "#fff",
  },
  complete: {
    background: "#B6eedf",
    color: "#fff",
  },
  inputField: {
    marginRight: "1em",
  },
  addForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1em",
    marginBottom: "5px",
  },
}));
