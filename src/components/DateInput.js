import React, { useState } from 'react';
import styles from './styles';

const DateInput = ({ day, setDay, month, setMonth, year, setYear }) => {

  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ];


  return (
    <div
      style={styles.container}
    >
      <input
        style={styles.input}
        type="number"
        placeholder="11"
        value={day}
        onChange={e => setDay(e.target.value)}
      />

      < select
        style={styles.select}
        value={month}
        onChange={e => setMonth(e.target.value)}
      >
        <option value="">Mês</option>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>

      <input
        style={styles.input}
        type="number"
        placeholder="2004"
        value={year}
        onChange={e => setYear(e.target.value)}
      />
    </div>
  );
};

export default DateInput;
