import React, { Component } from "react";
import CurrencyForm from "./components/CurrencyForm/CurrencyForm.js";
import Loader from "./components/Loader/Loader.js";
import Result from "./components/Result/Result.js";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      result: null,
    };
  }

  handleConvert = async (currency, amount) => {
    this.setState({ loading: true });
    try {
      const rate = await this.getCurrency(currency);
      const countedAmount = (amount * rate).toFixed(2);
      this.setState({
        result: `${amount.toFixed(2)} ${currency} = ${countedAmount} PLN`,
      });
    } catch (error) {
      this.setState({ result: "An error occurred. Please try again later." });
    } finally {
      this.setState({ loading: false });
    }
  };

  getCurrency = async (currencyCode) => {
    const apiUrl = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/?format=json`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      const data = await response.json();
      const rate = data?.rates?.[0]?.mid;
      if (rate) {
        return rate;
      } else {
        throw new Error("Incorrect data format from the API");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  render() {
    const { loading, result } = this.state;
    return (
      <div className="container">
        <h1 className="title-heading">Currency Converter</h1>
        <CurrencyForm onConvert={this.handleConvert} />
        {loading && <Loader />}
        {result && <Result result={result} />}
      </div>
    );
  }
}

export default App;
