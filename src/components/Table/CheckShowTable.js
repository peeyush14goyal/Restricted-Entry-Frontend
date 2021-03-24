import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import "./tablefooter.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#7761ea",
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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 450,
  },

  container: {
    maxHeight: 440,
  },
}));

const CheckShowTable = ({ data }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState();

  function createData(date, check_in, check_out) {
    return { date, check_in, check_out };
  }

  useEffect(() => {
    let values = [];
    data.Time.map((time, i) => {
      if (i % 2 === 0) {
        values.push(
          createData(
            `${time.substr(0, 10)}`,
            `${time.substr(11)}`,
            `${
              data.Time[i + 1]
                ? data.Time[i + 1].substr(11)
                : "Not Checked out yet"
            }`
          )
        );
      }
    });
    if (values.length > 0) {
      setRows(values);
    }
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Check-In</StyledTableCell>
              <StyledTableCell align="right">Check-Out</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              console.log(
                "Rows are ",
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              )}
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      key={`${row.date}${row.check_in}${row.check_out}`}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.date}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.check_in}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.check_out}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CheckShowTable;
