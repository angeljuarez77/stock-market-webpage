import React from 'react';
import axios from 'axios';

export default function SymbolForm(props){
    return(
        <div>
            <form>
                <input onChange={props.symbolInput} placeholder="Input the companies symbol"></input>
                <input onChange={props.rangeChange}></input>
                <button onClick={props.handleClick} type="submit"></button>
            </form>
        </div>
    )
}