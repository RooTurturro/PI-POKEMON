import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css'


export default function Landing(){
    return(
        <div className={styles.background} >
          
            <h1 className={styles.text}>Welcome to this PokeApi!<br/>Open your pokeball and see what we got</h1>
            <div>
                <Link to='/home' className={styles.button}>
                    <button className={styles.button}>HOME</button>         
                </Link>
            </div> 
        </div>
    )
}