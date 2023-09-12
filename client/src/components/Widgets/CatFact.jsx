import { useState, useEffect } from "react";

export default function CatFactWidget() {
    const searchFact = async () => {
        try {
            const response = await fetch(
                'https://meowfacts.herokuapp.com/'
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching CatFact data:', error);
            return null;
        }
    };

    const [fact, setFact] = useState({
        fact: ''
    });

    const fetchCatFact = async () => {
        const factData = await searchFact();
        console.log("Fact Data:", factData);
        if (factData) {
            setFact({
                fact: factData.data
            })
        }
    };

    useEffect(() => {
        fetchCatFact();
    }, []);

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Random Cat Fact</h5>
                    <p className="card-text">{fact.fact}</p>
                    <button className="btn btn-primary" type="button" onClick={fetchCatFact}>Generate New</button>
                </div>
            </div>
        </div>
    )
}