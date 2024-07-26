import React from 'react';
import styles from './styles';

const CityInput = ({city, setCity, state, setState }) => {

  const UF = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
  ];

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        type="text"
        placeholder="Vitória"
        value={city}
        onChange={e => {
          setCity(e.target.value)
        }}
      />
      <select
        style={styles.select}
        value={state}
        onChange={e => {
          setState(e.target.value)
        }}
      >
        <option value="">UF</option>
        {UF.map((uf, index) => (
          <option key={index} value={uf}>
            {uf}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityInput;
