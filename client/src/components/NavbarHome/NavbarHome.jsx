import React from "react";
import {Link} from "react-router-dom";
import { useDispatch} from 'react-redux';
import { filterByType, filterCreated, orderByName, orderByAttack, getPokemons } from '../../redux/actions';
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavbarHome.module.css"

export default function NavbarHome({name, image,types, id}){
    
    const dispatch = useDispatch()

    function handlerHome(e){
        e.preventDefault();
        dispatch(getPokemons())
    }

    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterByType(e.target.value))
    }

    function handleFilterCreated(e){
            e.preventDefault();
            dispatch(filterCreated(e.target.value));
          
    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
    }

    function handleOrderByAttack(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
    }

    return(
        
        <div className={styles.navBarHome}>

            <Link to="/home" onClick={(e) => handlerHome(e)} className={styles.button}>HOME</Link>

            <SearchBar/>

            <div className={styles.filters} key="filters">
                <select onChange={e => handleOrderByName(e)} className={styles.order} key="sort">
                    <option value="all">Order</option>
                    <option value="asc">Sort A-Z</option>
                    <option value="desc">Sort Z-A</option>
                </select>

                <select onChange={e => handleOrderByAttack(e)} className={styles.order} key="rank">
                <option value="all">Attack</option>
                    <option value="strong">Strong</option>
                    <option value="weak">Weak</option>
                </select>

                <select onChange={e => handleFilterCreated(e)} className={styles.created} key="create">
                    <option value="all">All</option>
                    <option value="created">Created</option>
                    <option value="existant">Existant</option>
                </select>

                <select onChange={e => handleFilterType(e)} className={styles.types} key="type">
                    <option value="all">All</option>
                        {types?.map((t) => {
                            return (
                                <option value={t} key={t}> {t?.charAt(0).toUpperCase() + t?.slice(1)} </option>
                            );
                        })}
                </select>
            </div>
            <div>
                <Link to="/create" className={styles.button}>CREATE</Link>
            </div>

        </div>
    )
}


