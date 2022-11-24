import React from 'react'
import "./Home.css"
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, clearDetail } from '../../redux/actions';
import PokemonCard from '../Card/PokemonCard';
import Paginado from '../Paginado/Paginado';
import NavbarHome from '../NavbarHome/NavbarHome';
import pokebola from "../resource/pokebola.png"

export default function Home (){
  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.pokemons)
 // ES IGUAL QUE HACER MAPSTATETOPROPS

  const currentTypes = useMemo(
    () => [...new Set(allPokemons.map((t) => t.Types).flat())],
    [allPokemons]
  );
  

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);

  const numberOfLastPokemon = currentPage * pokemonsPerPage // 12
  const numberOfFirstPokemon = numberOfLastPokemon - pokemonsPerPage // 0

  const currentPokemons = allPokemons.slice(numberOfFirstPokemon,numberOfLastPokemon)

  //pagina uno--> indice de mi primer personaje 0 
  //          --> indice de mi ultimo personaje 12
  // con slice le digo toma el array que contiene todos los pokemons 
  // y devolveme del 1 al 12 solo
  // que son las posiciones 0 al 11

  //pagina uno--> indice de mi primer personaje 12 
  //          --> indice de mi ultimo personaje 24

  const paginado = (pageNumber)=>{
      setCurrentPage(pageNumber)
  }

  useEffect(()=>{
    dispatch(clearDetail())
    dispatch(getTypes());
    dispatch(getPokemons());
    
  }, [dispatch])

  return(
    <div>
      <div>
        <NavbarHome types={currentTypes}/>
      </div>
      <div className="container">
        {
        currentPokemons.map(p =>{
           return <PokemonCard key={p.id} name={p.name} types={p.Types} image={!p.image?  p.image=pokebola : p.image} id={p.id} />
         })
       }
      
      </div>

      <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons ={allPokemons.length}  paginado={paginado}/>
    
    </div>
  )
}
