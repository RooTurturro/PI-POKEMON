const axios = require('axios');
const { Type } = require('../../db');

const getApiTypes = async () =>{
    try {
        const apiInfo = await axios.get("https://pokeapi.co/api/v2/type");
        const apiTypes = await apiInfo.data.results.map(t => t.name);
        apiTypes.forEach(type => {
            Type.findOrCreate({
                where:{
                    name: type,
                }
            })
        });

        const types = await Type.findAll();
        return types;
    } catch (error) {
        return console.log(error)
    }
}

module.exports = {
getApiTypes
 }
