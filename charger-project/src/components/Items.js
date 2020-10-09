import React from "react"
import {Link} from "react-router-dom"
import styles from './Items.module.css'
export default function Items(props){
  let price="free";
  if (props.type === 'slow') {
    if(props.free === 'yes')
    {
      price = "Free";
    }
    else if(props.free ==='no')
    {
       price = "0.20 e/min";
    }
  }
  else if(props.type === 'fast')
  {
    price = "18c/kWh";
  }
  return(  <li>

          <div>ID: {props.id}</div>
          <div>Name: {props.name}</div>
          <div>Location:{props.address},{props.city}</div>
          <div>Type: {props.type}</div>
          <div>Connectors:{props.connector}</div>
          <div>{props.electricity}KWh</div>
          <div>Price: {price}</div>
          <div>Key: {props.digit}</div>
          <div>Status: {props.free}</div>
          
          </li>
)
}