import "./App.css";
import React, { useState } from "react";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 140,
  },
  table: {
    minWidth: 700,
  },
  "& > *": {
    margin: theme.spacing(1),
    width: "30ch",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const AddTodaysDate = `${year}年${month}月${day}日`;

const dateToStr24HPad0 = (date, format) => {
  if (!format) {
    format = "YYYY-MM-DD";
  }
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ("0" + date.getDate()).slice(-2));
  return format;
};
const nowDate = dateToStr24HPad0(new Date(), "YYYY-MM-DD");

function App() {
  const [todoText, setTodoText] = useState("");
  const onChangeTodoText = (e) => setTodoText(e.target.value);
  const [listTodos, setListTodos] = useState([]);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newListTodos = [...listTodos, todoText];
    setListTodos(newListTodos);
    setTodoText("");
  };

  const classes = useStyles();
  const [add, setAdd] = useState([]);

  const onClickDelete = (index) => {
    const newListTodos = [...listTodos];
    newListTodos.splice(index, 1);
    setListTodos(newListTodos);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <div className="App">
          <h1>TODO LIST</h1>
        </div>
        <div>
          <form className={classes.container}>
            <input
              style={{ width: "400px" }}
              placeholder="TODOを入力"
              value={todoText}
              onChange={onChangeTodoText}
            />
            <TextField
              id="setDate"
              label="達成期日"
              type="date"
              defaultValue={nowDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" onClick={onClickAdd}>
              追　加
            </Button>
          </form>
          <p style={{ fontSize: "20px" }}></p>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">id</StyledTableCell>
                <StyledTableCell align="center">TODO</StyledTableCell>
                <StyledTableCell align="center">作成日</StyledTableCell>
                <StyledTableCell align="center">達成期限</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listTodos.map((todos, index) => (
                <StyledTableRow
                  key={todos}
                  value={add}
                  onChange={(e) => setAdd(e.target.value)}
                >
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">{todos}</StyledTableCell>
                  <StyledTableCell align="center">
                    {AddTodaysDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {AddTodaysDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onClickDelete(index)}
                    >
                      削除
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default App;
