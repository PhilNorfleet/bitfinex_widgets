import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeSortMethod } from 'actions/app';
import TableHeader from 'components/table/TableHeader';

@connect(state => ({
    sortMethod: state.app.sortMethod,
}))
export default class TableHeaderContainer extends Component {
    static propTypes = {
        sortMethod: PropTypes.object,
        columns: PropTypes.array,
        dispatch: PropTypes.func,
    }
    handleChangeSortMethod = (type) => {
        const { dispatch } = this.props;
        dispatch(changeSortMethod(type))
    }
    render() {
        return <TableHeader 
            { ...this.props }
            handleChangeSortMethod={ this.handleChangeSortMethod }/>
    }
}
