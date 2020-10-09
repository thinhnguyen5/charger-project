import React from 'react';
import Items from './Items'
import styles from './List.module.css';
import {Link, Redirect, Route} from 'react-router-dom'
import MapContainer from './MapContainer'
import { Map, GoogleApiWrapper } from 'google-maps-react';

export default function List(props)
{
  let login=()=>{
    return <Link to={'/login'}><button className={styles.button}>Log in</button></Link>
  };
  //let logout=()=>{
    //return <Link to={'/login'}><button className={styles.button} onClick={()=>props.logout}>Log out</button></Link>
//  };
const plug=props.plug;
const show_plug = props.show_plug;
const marker=props.marker;

if(props.isAuthenticated)
{
if(marker === null)
{
return(
  <div>
  <div id={styles.menubar}>
  <div><button className={styles.button} onClick={props.logout}>Log out</button></div>
  <div><Link to={'/digit'}><button className={styles.button}>Verify</button></Link></div>
  </div>
    <div id={styles.box}>
    <div><input type='text' name="search" onChange={props.newInput}/>
    <button onClick={props.search}>Search</button></div>
      {props.searchPlug.map(i=><div><Link to={'/search'}><button className={styles.searchList} onClick={()=>show_plug(i.id)}>{i.name}</button></Link></div>)}
    </div>)
    <div className={styles.map}>
    <MapContainer plug={plug} show_plug={props.show_plug} centerLat={props.centerLat} centerLng={props.centerLng}/>
    </div>
    </div>
  )
}
else {
  return(
    <div>
    <div id={styles.menubar}>
    <div><Link to={'/'}><button className={styles.button} onClick={props.logout}>Log out</button></Link></div>
    <div><Link to={'/digit'}><button className={styles.button}>Verify</button></Link></div>
    </div>
    <div id={styles.box}>
    <div><input type='text' onChange={props.newInput}/>
    <button onClick={props.search}>Search</button></div>
    <ul>
    <Items {...marker}/>
    </ul>
    </div>
    <div className={styles.map}>
    <MapContainer plug={plug} show_plug={props.show_plug} centerLat={props.centerLat} centerLng={props.centerLng}/>
    </div>
    </div>
  );
}
}
else{
  if(marker === null)
  {
    return(
      <div>
      <div id={styles.menubar}>
      <div>{login()}</div>
      <div><Link to={'/register'}><button className={styles.button}>Register</button></Link></div>
      <div><Link to={'/digit'}><button className={styles.button}>Verify</button></Link></div>
      </div>
        <div id={styles.box}>
        <div><input type='text' name="search" onChange={props.newInput}/>
        <button onClick={props.search}>Search</button></div>
          {props.searchPlug.map(i=><div><Link to={'/search'}><button className={styles.searchList} onClick={()=>show_plug(i.id)}>{i.name},{i.city}</button></Link></div>)}
        </div>
        <div className={styles.map}>
        <MapContainer plug={plug} show_plug={props.show_plug} centerLat={props.centerLat} centerLng={props.centerLng}/>
        </div>
        </div>
      )
    }
else{
  return(
    <div>
    <div id={styles.menubar}>
    <div>{login()}</div>
    <div><Link to={'/register'}><button className={styles.button}>Register</button></Link></div>
    <div><Link to={'/digit'}><button className={styles.button}>Verify</button></Link></div>
    </div>
    <div id={styles.box}>
    <div><input type='text' onChange={props.newInput}/>
    <button onClick={props.search}>Search</button></div>

    <ul>
    <Items {...marker}/>
    </ul>
    </div>
    <div className={styles.map}>
    <MapContainer plug={plug} show_plug={props.show_plug} centerLat={props.centerLat} centerLng={props.centerLng}/>
    </div>
    </div>
  );
}
}
}