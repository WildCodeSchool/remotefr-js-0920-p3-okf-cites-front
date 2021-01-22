import React from 'react';
import * as d3 from 'd3';
import styles from './Data.module.css';

d3.csv('../assets/TableSPECIES+.csv', function (data) {
  console.log(data);
});
export default function Data() {
  return <div className={styles.data} />;
}
