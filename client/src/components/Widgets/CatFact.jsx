import { useState, useEffect } from "react";
import storeCat  from '../../images/store-cat-img.png'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title mb-2">Random Cat Fact</h5>
                    <img className="storeCat mb-2" src={storeCat} alt="Store Cat" />
                    <p className="card-text">{fact.fact}</p>
                    <button className="font btn btn-primary" type="button" onClick={fetchCatFact}>Generate New</button>
                </div>
            </div>
        </div>
    )
}