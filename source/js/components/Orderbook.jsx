import React from 'react';
import Bids from 'containers/Bids';
import Asks from 'containers/Asks';

const Orderbook = () => {
    return (
        <div className='Orderbook'>
            <Bids />
            <Asks />
        </div>
    );
};

export default Orderbook;