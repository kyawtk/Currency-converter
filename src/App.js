import React, { useState, useEffect } from "react";
import "./App.css";
import DisplayCurrency from "./components/DisplayCurrency";

let URL = "https://api.exchangeratesapi.io/latest";

function App() {
  let [currencyOptions, setoptions] = useState([]);
  let [fromCurrency, setfromCurrency] = useState();
  let [toCurrency, settoCurrency] = useState();
  let [exchangerate, setexchangerate] = useState();
  let [amount, setamount] = useState(1);
  let [tofromamount, settofromamount] = useState(true);

  let toamount, fromamount;
  if (tofromamount) {
    fromamount = amount;
    toamount = fromamount * exchangerate || 0;
  } else {
    toamount = amount;
    fromamount = toamount / exchangerate ||0;
  }
  useEffect(() => {
    fetch(URL)
      .then((respond) => respond.json())
      .then((data) => {
        let firstcurrency = Object.keys(data.rates)[0];
        setoptions([data.base, ...Object.keys(data.rates)]);
        setfromCurrency(data.base);
        settoCurrency(firstcurrency);
        setexchangerate(data.rates[firstcurrency]);
      });
  }, []);

  useEffect(() => {
    if (toCurrency && fromCurrency) {
      fetch(`${URL}/?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((respond) => respond.json())
        .then((data) => setexchangerate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handlefromchange(e) {
    setamount(e.target.value);
    settofromamount(true);
  }
  function handletochange(e) {
    setamount(e.target.value);
    settofromamount(false);
  }
  return (
    <div className="App">
      <div className="container">
        <DisplayCurrency
          currencyOptions={currencyOptions}
          defaultCurrency={fromCurrency}
          changeoption={(e) => setfromCurrency(e.target.value)}
          amount={fromamount}
          changeamount={handlefromchange}
        />
        <div className="equal-sign">=</div>
        <DisplayCurrency
          currencyOptions={currencyOptions}
          defaultCurrency={toCurrency}
          changeoption={(e) => settoCurrency(e.target.value)}
          amount={toamount}
          changeamount={handletochange}
        />
      </div>
    </div>
  );
}

export default App;
