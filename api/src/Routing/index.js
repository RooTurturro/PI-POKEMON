const { Router } = require('express');
const typesRouter = require("./Routes/typesRoutes");
const pokemonsRouter = require("./Routes/pokemonsRoutes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/types", typesRouter );
router.use("/pokemons", pokemonsRouter);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
