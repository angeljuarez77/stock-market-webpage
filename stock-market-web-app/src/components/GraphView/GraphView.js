import React from 'react';

export default function GraphView(props){
    return(
        <div> 
            <h1 onClick={props.homeView} id="home">Home</h1>
        </div>
    )
}