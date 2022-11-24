import React from "react";
import {Link} from "react-router-dom";
import "../Card/PokemonCard.css";
import "./type.css"


export default function PokemonCard({name, image,types, id}){
    return(
        
        <div className="card">
            <img src={image} alt="img" className="img"></img>
            <Link to={`/pokemon/${id}`} className="link">
                <h3 className="name">
                    {name[0].toUpperCase() + name.slice(1)}
                </h3>
            </Link>
            <div className="types">
                {types?.map((type)=>(
                    <div key={id + type} className={type}>
                        {type?.charAt(0).toUpperCase() + type?.slice(1)}
                    </div>
                    
                ))}
            </div>
        </div>
    )
}

