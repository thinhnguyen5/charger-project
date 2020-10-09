import React from "react"
import { Redirect, Route } from "react-router-dom";
import styles from './Start.module.css';
export default function Start(props)
{
  if(props.isAuthenticated)
  {
    if (props.plugVerify === null)
    {
      alert('We cant find your code');
      return(
        <React.Fragment><Redirect to='/digit' /></React.Fragment>)
    }
    else{
    const getSecond = ()=>
    {
      return('0' + props.second %60).slice(-2);
    }
    const getMinute = ()=>
    {
      return ('0' + Math.floor(props.second / 60) %60).slice(-2);
    }
    const getHour = ()=>
    {
      return ('0' + Math.floor(props.second / 3600)).slice(-2);
    }
    const money = Number(Math.round(props.money +'e2')+'e-2');

  return(
    <div><button onClick={() => props.history.goBack()}>Back</button>
    <div id={styles.center}>
    <div className={styles.number}>{getHour()}:{getMinute()}:{getSecond()}</div>
    <button className={styles.button} onClick={props.start}>Start</button>
    <button className={styles.button} onClick={props.stop}>Stop</button>
    <div>Your payment is: {money}e</div>
    </div>
    </div>
  )
}
}
else{
  return(
    <React.Fragment><Redirect to='/login' /></React.Fragment>
)
}
}