import React from 'react';
import TableHeader from 'containers/TableHeader';
const columns = [
    {
        name: 'Price',
        ket: 'price',
    },
    {
        name: 'Amount',
        ket: 'amount',
    },
];
const Bids = ({ bids }) => {
    const makeRows = () => {
        return Object.keys(bids).map((bid) => {
            return (
                <tr key={bid}>
                    <td className='price'>{bid}</td>
                    <td className='amount'>{bids[bid]}</td>
                </tr>
            )
        })
    }
    return (
        <table className='Bids' >
            <TableHeader columns={ columns } />
            {makeRows()}
        </table>
    );
};

export default Bids;