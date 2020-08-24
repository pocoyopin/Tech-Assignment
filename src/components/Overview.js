import React, {useEffect, useState} from 'react';
import './Overview.css';

function Overview(props) {
    const [subordinates, setSubordinates] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`http://api.additivasia.io/api/v1/assignment/employees/${props.match.params.name}`)
            .then(res => res.json())
            .then(res => {
                setIsLoaded(true);
                if (res[1]) { 
                    setSubordinates(res[1]['direct-subordinates']);
                    res[1]['direct-subordinates'].forEach((sub) => {
                        findSubordinates(sub);
                    });
                }
            }, error => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    function findSubordinates(name) {
        fetch(`http://api.additivasia.io/api/v1/assignment/employees/${name}`)
            .then(res => res.json())
            .then(res => {
                if (res[1]) {
                    res[1]['direct-subordinates'].forEach((sub) => {
                        findSubordinates(sub);
                        if (!subordinates.includes(sub)){
                            setSubordinates(subordinates => [...subordinates, sub]);
                        }
                    });
                }
            });
    }

    if (error) {
        return (<div>Error: {error.message} </div>);
    } else if (!isLoaded) {
        return (<div>Loading...</div>);
    } else {
        const uniqueSubs = Array.from(new Set(subordinates));
        return (
            <div>
                <h1>Employee Overview</h1>
                <div className="subordinate-list">
                    <h2>Subordinates of employee {props.match.params.name}:</h2>
                    {uniqueSubs.length ? uniqueSubs.map(sub => <p>{sub}</p>) : <p>Not found</p>}
                </div>
            </div>
        );
    }
}

export default Overview;
