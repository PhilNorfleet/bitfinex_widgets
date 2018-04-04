import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeSortMethod } from 'actions/app';
import TableHeader from 'components/TableHeader';

@connect(state => ({
    sortMethod: state.app.sortMethod,
}))
export default class TableHeaderContainer extends Component {
    static propTypes = {
        sortMethod: PropTypes.object,
        columns: PropTypes.array,
    }
    handleChangeSortMethod = (type, direction) => {
        const { dispatch } = this.props;
        dispatch(changeSortMethod(type, direction))
    }
    render() {
        const {
            sortMethod,
            columns
        } = this.props;
        return <TableHeader 
            sortMethod={sortMethod}
            handleChangeSortMethod={this.handleChangeSortMethod}
            columns={columns}/>
    }
}
