import { useState, useEffect } from "react";

export default function BoredAPIWidget() {
    const searchBored = async () => {
        try {
            const response = await fetch(
                'https://www.boredapi.com/api/activity/'
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching BoredAPI data:', error);
            return null;
        }
    };

    const [activity, setActivity] = useState({
        activity: ''
    });

    const fetchNewActivity = async () => {
        const boredData = await searchBored();
        if (boredData) {
            setActivity({
                activity: boredData.activity
            })
        }
    };

    useEffect(() => {
        fetchNewActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const addToFavorites = async () => {
    //     // Implement your logic to add photoData to favorites here
    //     console.log(activity);
    //   };

    return (
        <div>
            <div className="widget" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Random Activity</h5>
                    <p className="card-text">{activity.activity}</p>
                    <button className="btn btn-primary generate-btn" type="button" onClick={fetchNewActivity}>Generate New</button>
                </div>
            </div>
        </div>
    )
}