import React from "react";
import styles from "../Paginado/Paginado.module.css"

export default function Paginado({pokemonsPerPage,allPokemons,paginado}){
    const pageNumbers=[];

    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <div className={styles.contCards}>{
                       pageNumbers && pageNumbers.map(number=>(
                        <ul className={styles.pageNumbers} key={number}> 
                            <li><button onClick={()=>paginado(number)} className={styles.active}>{number}</button></li>
                        </ul>
                         ))
                   }
        </div>
    )
}