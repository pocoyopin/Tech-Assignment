import React, {useState} from 'react';

function Home(props) {
    const [name, setName] = useState("");

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.history.push(`/overview/${name}`);
    }

    return (
        <div onSubmit={handleSubmit}>
            <form>
                <h1>Employee Explorer</h1>
                <input type="search" onChange={handleChange}/>
                <input type="submit" value="Search"/>
            </form>
        </div>
    );
}

export default Home;
