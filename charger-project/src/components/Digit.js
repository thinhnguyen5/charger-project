import React from "react"
import { Redirect, Route, Link } from "react-router-dom";
import styles from './Digit.module.css';

export default function Digit(props)
{
  if(props.isAuthenticated)
  {
  return(
    <div>
    <button onClick={() => props.history.goBack()}>Back</button>
    <div id={styles.center}>
    <form onSubmit={ props.choosePlug }>
    <div>Enter your code</div>
    <input type="text" name="digit" maxlength="4"/>
    <button type="submit">Enter</button>
    </form>
    <Link to='/start'><button>Start charging</button></Link>
    </div>
    </div>
  )
}
else{
  alert('You need to login ');
  return(
    <React.Fragment><Redirect to='/login' /></React.Fragment>
)}

}