import React from 'react';

export default function OpeningView(props) {
    return (
        <div>
            <h1 className="logo">Stock Market Web Page Home</h1>
            <div onClick={props.grabId} className="logos-section">
                {props.allInfo.companies.map(x => <img alt="logo" key={x.symbol} data-view="range" src={x.logo} id={x.symbol}></img>)}
            </div>
        </div>
    )
}