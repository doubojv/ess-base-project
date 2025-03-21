const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 4001;

// Importação das rotas modularizadas
const pratosRouter = require('./routes/gerenciaPratos');
const categoriesRouter = require('./routes/gerenciaCategorias.js');
const buscasRouter= require('./routes/buscas.js');
const mostViewedRouter= require('./routes/mostViewed.js');
const newsRouter= require('./routes/gerenciaNoticias.js');
const initialRouter= require('./routes/pag_inicial.js');
const trendingRouter= require('./routes/em_alta.js');
const usersRouter = require('./routes/gerenciaUsuarios.js');
const favoritesRouter = require('./routes/favoritos.js');
// const usageReportRoutes = require('./routes/relatorioUso.js');

//const reviewsRouter = require('./src/routes/reviews');

// Montagem das rotas
app.use('/dishes', pratosRouter);
app.use('/categories', categoriesRouter);
app.use('/search', buscasRouter);
app.use('/most-viewed', mostViewedRouter);
app.use('/news', newsRouter);
app.use('/inital', initialRouter);
app.use('/trending', trendingRouter);
app.use('/users', usersRouter);
app.use('/favorites', favoritesRouter);
// app.use("/usage-report", usageReportRoutes);

//app.use('/reviews', reviewsRouter);

module.exports = app
// Inicialização do servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}


