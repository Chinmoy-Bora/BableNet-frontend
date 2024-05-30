import React from 'react';
import "../styling/HomeStyle.css";

function Home() {
    return (
        <div className="Home">
            <div className="content">
                <div className="Leftmost">
                <h1>Convert your imagination<br/>into picture</h1>
                </div>
                <div className="Rightmost">
                <img src='/AI.png' alt='back img' className='centered-image' />
                </div>
            </div>
        </div>
    );
}

export default Home;
