import React from 'react'
import { useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail, deletePokemon,getPokemons } from '../../redux/actions';
import NavBarReturn from '../NavbarReturn/NavbarReturn'
import styles from "./Detail.module.css"
import '../Card/type.css'
import pokebola from "../resource/pokebola.png"


export default function Detail (){

  const {id} = useParams()
  const dispatch = useDispatch()
  const pokemon = useSelector((state) => state.detail);// ES IGUAL QUE HACER MAPSTATETOPROPS


  const history = useHistory();
 
  useEffect(()=>{
    dispatch(getPokemonDetail(id))
  }, [dispatch, id])

  const handlerDelete = () => {
    dispatch(deletePokemon(pokemon.id));
    alert("Pokemon eliminado");
    history.push("/home");
    dispatch(getPokemons());
  };

  return(
    <div >
        <NavBarReturn/>
        <div className={styles.contGral}>
            <div  className={styles.contIzq}>
                <div className={styles.circulo}>
                    <img src={!pokemon.image? pokebola : pokemon.image } alt="Img" className={styles.image}></img>
                </div>
                <h1>{pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}</h1>
                <div className={styles.types}>
                          {pokemon.Types?.map((type)=>(
                              <div key={type} className={pokemon.Types}>
                                  {type?.charAt(0).toUpperCase() + type?.slice(1)}
                              </div>
                          ))}
                </div>
                <h3 className={styles.types}>Id:{pokemon.id}</h3>
              </div>
              <div className={styles.contDer}>
   
                      <p className={styles.types}>Hit Points</p>
                      <div className={styles.types}>{pokemon.hp}</div>

                      <p className={styles.types}>Attack</p>
                      <div className={styles.types}>{pokemon.attack}</div>

                      <p className={styles.types}>Defense</p>
                      <div className={styles.types}>{pokemon.defense}</div>
                      
                      <p className={styles.types}>Speed</p>
                      <div className={styles.types}>{pokemon.speed}</div>
              </div>
                <div className={styles.alturaPeso}>
                    <p className={styles.medidas}>Height:<br/>{pokemon.height}</p>
                    <p className={styles.medidas}>Weight:<br/>{pokemon.weight}</p>
                </div>
            </div>
            {pokemon.createdInDb && (
                    <div className={styles.buttons}>
                    <button
                        onClick={(e) => handlerDelete(e)}
                        className={styles.button}
                      >
                        Delete Pokemon
                      </button>
                    </div>
                    
                  )}
            
        </div> 
  )
}
