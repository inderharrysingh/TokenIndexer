import './Table.scss';
import { Utils }  from 'alchemy-sdk'; 
import { useState, useEffect} from 'react';
import CircularImage from './CircularImage';

function Table({Value , Meta }){
 
  const center = {
    minWidth : '50em'
  }

    return (
      <table className="container">
        <tbody>
          <tr>
            <th>Logo</th>
            <th>Symbol</th>
            <th>Amount</th>
            </tr>
          {
            Value.map((amount, index) => (
            <tr key={index}>
              <td ><CircularImage imageUrl={Meta[index].logo} radius={50} /></td>
              <td style={center}>{ (Meta[index].symbol) ? (Meta[index].symbol) : ("No Symbol") }</td>
              <td>{ Number(Utils.formatUnits(amount.tokenBalance, Meta[index].decimals)).toExponential(3)}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    );
  }
  

export default Table;