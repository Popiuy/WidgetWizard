// const APIKey = 308a45b3f970b6b7823c3265a349923c71265379
// const currenciesList = https://api.getgeoapi.com/v2/currency/list?api_key=308a45b3f970b6b7823c3265a349923c71265379&format=HTML/list
// const URL = `https://api.getgeoapi.com/v2/currency/convert?api_key=${APIkey}&from=${currencyInput}&to=${currencyOutput}&amount=1&format=json`

// drop down to select input currency {base_currency_code} based on list provided. obs: base_currency_code = currencyInput
// drop down to select output currency {rates.currency_output}
// result display rate {rates.currency_output.rate}

import React, { useState, useEffect } from 'react';

export default function CurrencyConverter () {
    const [currencies, setCurrencies] = useState([]);
    const [currencyInput, setCurrencyInput] = useState('');
    const [currencyOutput, setCurrencyOutput] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);

    const API_KEY = '308a45b3f970b6b7823c3265a349923c71265379';

    // Fetch the list of currencies from the API
    const fetchCurrencies = async () => {
        try {
            const response = await fetch(
                'https://api.getgeoapi.com/v2/currency/list?api_key=308a45b3f970b6b7823c3265a349923c71265379&format=HTML/list'
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const currencyList = Object.keys(data);
            setCurrencies(currencyList);
        } catch (error) {
            console.error('Error fetching joke data:', error);
            return null;
        }
    };

    useEffect(() => {
        fetchCurrencies ();
      }, []);
    

    const fetchExchangeRate = async () => {
    // Fetch the exchange rate from the API
        try {
            const response = await fetch(
                `https://api.getgeoapi.com/v2/currency/convert?api_key=308a45b3f970b6b7823c3265a349923c71265379&from=${currencyInput}&to=${currencyOutput}&amount=1&format=json`
            );
            if (!response.ok) {
                throw new Error ('Failed to fetch data');
            }
            const data = await response.json();
            const rate = data.rates[currencyOutput].rate;
            setExchangeRate(rate);
        } catch (error) {
            console.error('Error fetching joke data', error);
        }
    };

useEffect(() => {
    fetchExchangeRate ();
      }, [currencyInput, currencyOutput]);

return (
    <div>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Currency Converter</Card.Title>
                <Form>
                    <Form.Group controlId="currencyInput">
                        <Form.Label>From Currency</Form.Label>
                        <Form.Control
                            as="select"
                            value={currencyInput}
                            onChange={(e) => setCurrencyInput(e.target.value)}
                        >
                            <option value="">Select a currency</option>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="currencyOutput">
                        <Form.Label>To Currency</Form.Label>
                        <Form.Control
                            as="select"
                            value={currencyOutput}
                            onChange={(e) => setCurrencyOutput(e.target.value)}
                        >
                            <option value="">Select a currency</option>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>

                <button className="btn btn-primary" type="button" onClick={fetchExchangeRate}>
                    Convert
                </button>

                {exchangeRate !== null && (
                    <p>
                        Exchange Rate: 1 {currencyInput} = {exchangeRate} {currencyOutput}
                    </p>
                )}
            </Card.Body>
        </Card>
    </div>
);
}

