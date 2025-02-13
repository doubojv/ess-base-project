const express = require('express');
const router = express.Router();
const { news } = require('../database/noticias.js'); // Importa o array de notícias

let nextNewsId = 5; // Próximo ID para novas notícias

// Função para validar se o ID é um número válido
const isValidId = (id) => !isNaN(id) && Number.isInteger(parseFloat(id));

// Função para encontrar uma notícia pelo ID
const findNewsById = (id) => news.find(n => n.id === parseInt(id));

// Função para validar os campos da notícia
const validateNews = (title, subtitle, body) => {
  const errors = [];

  if (!title || title.length > 100) {
    errors.push('O título é obrigatório e deve ter no máximo 100 caracteres.');
  }

  if (!subtitle || subtitle.length > 100) {
    errors.push('O subtítulo é obrigatório e deve ter no máximo 100 caracteres.');
  }

  if (!body || body.length > 1000) {
    errors.push('O corpo da notícia é obrigatório e deve ter no máximo 1000 caracteres.');
  }

  return errors;
};

// Rota para listar todas as notícias
router.get('/', (req, res) => {
  res.send(news);
});

// Rota para obter detalhes de uma notícia
router.get('/:id', (req, res) => {
  const id = req.params.id;

  if (!isValidId(id)) {
    return res.status(400).send({ error: 'ID inválido' });
  }

  const noticia = findNewsById(id);
  noticia ? res.send(noticia) : res.status(404).send({ error: 'Notícia não encontrada' });
});

// Rota para criar uma nova notícia
router.post('/', (req, res) => {
  const { title, subtitle, body, publicationDate } = req.body;

  // Validações
  const errors = validateNews(title, subtitle, body);
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }

  // Verifica se a data de publicação foi fornecida
  if (!publicationDate) {
    return res.status(400).send({ error: 'A data de publicação é obrigatória.' });
  }

  // Cria a nova notícia
  const newNews = {
    id: nextNewsId++,
    title,
    subtitle,
    body,
    publicationDate
  };

  news.push(newNews);
  res.status(201).send(newNews);
});

// Rota para editar uma notícia
router.put('/:id', (req, res) => {
  const id = req.params.id;

  if (!isValidId(id)) {
    return res.status(400).send({ error: 'ID inválido' });
  }

  const noticia = findNewsById(id);
  if (!noticia) {
    return res.status(404).send({ error: 'Notícia não encontrada' });
  }

  const { title, subtitle, body, publicationDate } = req.body;

  // Validações
  const errors = validateNews(title, subtitle, body);
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }

  // Atualiza a notícia
  noticia.title = title;
  noticia.subtitle = subtitle;
  noticia.body = body;
  noticia.publicationDate = publicationDate || noticia.publicationDate; // Mantém a data atual se não for fornecida

  res.status(200).send(noticia);
});

// Rota para deletar uma notícia
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    if (!isValidId(id)) {
      return res.status(400).send({ error: 'ID inválido' });
    }
  
    const noticiaIndex = news.findIndex(n => n.id === id);
  
    if (noticiaIndex === -1) {
      return res.status(404).send({ error: 'Notícia não encontrada' });
    }
  
    // Armazena a notícia que será deletada
    const noticiaDeletada = news[noticiaIndex];
  
    // Remove a notícia do array
    news.splice(noticiaIndex, 1);
  
    // Retorna a notícia deletada e uma mensagem de confirmação
    res.status(200).send({
      message: 'Notícia deletada com sucesso.',
      noticiaDeletada: noticiaDeletada
    });
  });

module.exports = router;