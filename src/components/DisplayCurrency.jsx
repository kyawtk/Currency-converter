import React from "react";

const DisplayCurrency = (props) => {
  let { currencyOptions, defaultCurrency ,changeoption ,amount,changeamount} = props;

  return (
    <div className="display-amount">
      <input type="number" className="amount-input" value={amount} onChange = {changeamount}/>
      <select
        name="currency"
        className="currency-select"
        value={defaultCurrency}
        onChange={changeoption}
      >
        {currencyOptions.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DisplayCurrency;
