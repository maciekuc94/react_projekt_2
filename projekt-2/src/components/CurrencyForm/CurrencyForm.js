import React, { useState } from "react";
import "./CurrencyForm.css";

function CurrencyForm({ onConvert }) {
  const [currency, setCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    if (amountValue < 0.01) {
      alert("Minimum value is 0.01");
      return;
    }
    onConvert(currency, amountValue);
  };

  return (
    <form id="currency-form" className="currency-form" onSubmit={handleSubmit}>
      <label htmlFor="currency-select" className="form-label">
        Select currency:
      </label>
      <select
        id="currency-select"
        name="currency"
        className="form-element"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}>
        <option value="EUR">Euro</option>
        <option value="USD">US Dollars</option>
        <option value="CHF">Swiss Francs</option>
      </select>
      <label htmlFor="amount" className="form-label">
        Amount:
      </label>
      <input
        type="number"
        id="amount"
        name="amount"
        className="form-element"
        min="0"
        step="0.01"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" className="form-button form-element">
        Convert
      </button>
    </form>
  );
}

export default CurrencyForm;
