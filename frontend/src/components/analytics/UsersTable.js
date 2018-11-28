import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});


class UsersTable extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onRowSelection.bind(this);
    }

    async componentDidMount() {
        const users = await axios.get('/users/getUsers');
        this.setState({ users: users.data.users });
    }

    onRowSelection = selected => {
      console.log(`Selected: ${selected}`);
    };

    render() {
        return (
                    <Paper>
                        <Table selectable={true}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>Student Id</CustomTableCell>
                                    <CustomTableCell>Name</CustomTableCell>
                                    <CustomTableCell>Course</CustomTableCell>
                                    <CustomTableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.users ? this.state.users.map(row => {
                                    return (
                                        <TableRow key={row.studentId}>
                                            <CustomTableCell component="th" scope="row">
                                                {row.studentId}
                                            </CustomTableCell>
                                            <CustomTableCell>{row.name}</CustomTableCell>
                                            <CustomTableCell numeric>{row.description}</CustomTableCell>
                                            <CustomTableCell className="fa fa-cog fa-2x">
                                            </CustomTableCell>
                                        </TableRow>
                                    );
                                }) : ''}
                            </TableBody>
                        </Table>
                    </Paper>
        )
    }
}

UsersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);