import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";

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
}));

const CheckTable = ({ data }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Check-In</StyledTableCell>
            <StyledTableCell align="right">Check-Out</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Time.map((time, i) => {
            if (i % 2 === 0) {
              return (
                <StyledTableRow key={time.substr(0, 10)}>
                  <StyledTableCell component="th" scope="row">
                    {time.substr(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {time.substr(11)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {data.Time[i + 1]
                      ? data.Time[i + 1].substr(11)
                      : "Not Checked out yet"}
                  </StyledTableCell>
                </StyledTableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckTable;
