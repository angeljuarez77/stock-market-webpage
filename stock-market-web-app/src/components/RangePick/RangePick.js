import React from 'react';

export default function RangePick(props){
    return(
        <div>
            <h1 onClick={props.onClick} id="opening">Home</h1>
            <form>
                <button onClick={props.onRadioClick} type="radio" id="5y">5y</button>
                <button onClick={props.onRadioClick} type="radio" id="2y">2y</button>
                <button onClick={props.onRadioClick} type="radio" id="1y">1y</button>
                <button onClick={props.onRadioClick} type="radio" id="6m">6m</button>
                <button onClick={props.onRadioClick} type="radio" id="3m">3m</button>
                <button onClick={props.onRadioClick} type="radio" id="1m">1m</button>
                <button onClick={props.onRadioClick} type="radio" id="1d">1d</button>
                <button type="submit" onClick={props.submitAll} id="graph">SEE GRAPH!</button>
            </form>
        </div>
    )
}