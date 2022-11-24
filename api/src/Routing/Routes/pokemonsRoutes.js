const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../../db")
const { pokemonsApi, pokemonsDB, allPokemons,} = require("../Utils/pokemonsUtils")
const axiosInstance = require("../getAxios")


const pokemonsRouter = Router();

pokemonsRouter.get("/", async (req, res)=>{
    const {name} = req.query
    const allPokesName = await allPokemons();
    try {
        if (name) {
            const pokemon =  allPokesName.filter(e => e.name.toLowerCase() === name.toLowerCase());
            pokemon.length ? res.status(200).send(pokemon) : res.status(404).send('Pokemon not found'); 
            console.log(pokemon)
        } else {
            const pokemons = allPokesName
            return res.status(200).send(pokemons);
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

pokemonsRouter.get("/:id", async (req, res)=>{
    const {id} = req.params;
    const allPoke = await allPokemons()
    try {
        if (id) {
            const pokemonId = allPoke.filter(e => e.id == id);
            pokemonId.length ?
                res.status(200).json(pokemonId) :
                res.status(404).send('Pokemon not found')
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

pokemonsRouter.post("/", async (req, res)=>{
    try {
        const {name, hp, attack, speed, defense, height, weight, img, types } = req.body;
        const newPokemon = await Pokemon.create({name, hp, attack, speed, defense, height, weight, img})
        const typeDB =await Type.findAll({
            where:{
                name: types,
            }
        })

        newPokemon.addType(typeDB);
        res.status(201).send(newPokemon);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

pokemonsRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const pokemonDelete = await Pokemon.findByPk(id);
      if (!pokemonDelete) {
        res.status(400).send("No existe el pokemon que deseas eliminar");
      } else {
        pokemonDelete.destroy();
        return res.status(200).send("Pokemon eliminado correctamente");
      }
    } catch (error) {
      res.status(400).json({ error: error.message }, "Entré al error de delete");
    }
  });

  pokemonsRouter.put("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        types,
        createdInDb,
      } = req.body;
      if (id) {
        let urlImage = "";
  
        if (image) {
          urlImage = image;
        } else {
          urlImage = "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c31f.png";
        }
  
        if (name) {
          const findPokemon = await Pokemon.findByPk(id);
          await findPokemon.update(
            {
              name,
              hp,
              attack,
              defense,
              speed,
              height,
              weight,
              image: urlImage,
              createdInDb,
            },
            { where: { id: id } }
          );
  
          const typeDb = await Type.findAll({
            where: { name: types },
          });
  
          await findPokemon.setTypes(typeDb);
          res.status(200).send("Pokemon modificado con exito");
        } else {
          res.status(400).send("Faltaron datos para modificar el pokemon");
        }
      }
    } catch (error) {
      console.log("entre al error del put", error);
    }
  });
  
module.exports = pokemonsRouter;