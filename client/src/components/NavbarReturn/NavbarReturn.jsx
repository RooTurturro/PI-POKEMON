import React from "react";
import {Link} from "react-router-dom";

import styles from "./NavbarReturn.module.css"


export default function NavbarHome(){

    return(
        <div>
            <div className={styles.navBarReturn}>
                <Link to="/home" className={styles.button}>HOME</Link>
                <Link to="/create" className={styles.button}>CREATE</Link>
            </div>
        </div>
    )
}