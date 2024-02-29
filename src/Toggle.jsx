import {useState} from 'react';

const Toggle = ({handleChange, showIncome}) => {

  return (
    <label className={showIncome ? 'toggle on' : 'toggle off'}>
      <input
        type="checkbox"
        checked={showIncome}
        onChange={handleChange}
      />
      {showIncome ? 'Income' : 'Asset'}
    </label>
  );
};

export default Toggle;