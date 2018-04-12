import React from 'react';
import Ticker from 'containers/Ticker';
import Table from 'components/table/Table';
import { takeWhile } from 'lodash';

const columns = [
  {
    name: 'Symbol',
    key: 'asset',
  },
  {
    name: 'Last',
    key: 'lastPrice',
  },
  {
    name: '24HR',
    key: 'dailyChangePerc',
  },
  {
    name: 'Vol',
    key: 'volume',
  },
];
const Tickers = ({ tickers }) => {
  const makeTickers = () => {
    const rows = [];
    let unit = [];
    let rowCount = 1;

    for (let i = 0; i < tickers.length; i++) {
      const thisAsset = tickers[i].asset;
      const lastAsset = i > 0 ? tickers[i - 1].asset : null;
      const nextAsset = i < tickers.length - 1 ? tickers[i + 1].asset : null;
      const first = lastAsset !== thisAsset;
      const last = nextAsset !== thisAsset;
      if (first && !last) {
        rowCount = takeWhile(tickers.slice(i), (t) => {
          return thisAsset === t.asset;
        }).length;
      }
      const row = (
        <Ticker 
          first={ first }
          rowCount={ rowCount }
          ticker={ tickers[i] }
          key={ tickers[i].symbol }
        />
      );

      unit.push(row);
      if (last) {
        rows.push(unit);
        unit = [];
        rowCount = 1;
      }
    }
    return rows;
  };

  return (
    <Table 
      columns={ columns }
      makeRows={ makeTickers }
      data={ tickers }
      sortable
      parent='Tickers'
    />
  );
};

export default Tickers;
