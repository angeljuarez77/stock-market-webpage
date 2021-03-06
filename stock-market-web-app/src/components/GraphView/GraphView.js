import React from 'react';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick';
import Chart from 'chart.js';

export default function GraphView(props){

    function things(){
        if(props.stockInfo == false){
            // a case so that if my stock info is empty it won't throw an error saying that it can't read a value of null before the next steps
        } 
        else if(props.range === '1d'){
            const store = []
            props.stockInfo.map(x => store.push(new Array(x.minute , x.average)))
            for(let i = 0; i < store.length; i++){
                if(store[i][1] === -1){
                    console.log(store[i - 1])
                    console.log(store[i])
                    console.log(store[i + 1])
                    store.splice([i], 1)
                }
            }
            console.log(store)
            return store
        } else {
            const infoStorage = [];
            props.stockInfo.map(x => infoStorage.push(new Array(x.date, x.close)))
            return infoStorage
        }
    }

    function identifyMin(){
        // find the lowest num in the arr
        if(props.stockInfo == false){
            // do nothing ayyeeeeeee
        } else if(props.range === '1d'){
            const values = props.stockInfo.map(x => x.average);
            const minimum = Math.min(...values);
            return minimum;
        } else {
            const allVals = props.stockInfo.map(x => x.close);
            const lowestNum = Math.min(...allVals);
            return lowestNum;
        }
    }
    
    function identifyMax(){
        if(props.stockInfo == false){
            // there might be a better way to do this?
        } else if (props.range === '1d'){
            const values = props.stockInfo.map(x => x.average);
            const max = Math.max(...values);
            return max;
        } else {
            const allVals = props.stockInfo.map(x => x.close);
            const maxNum = Math.max(...allVals);
            return maxNum
        }
    }

    return(
            <div> 
                <h1 onClick={props.homeView} className="home">Home</h1>
                <h2 className="company-name">{props.symbol}</h2>
                <h3 className="company-name">{props.name}</h3>
                <LineChart data={things()} min={identifyMin()} max={identifyMax()}/>
            </div>
        )
}