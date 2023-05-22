const express = require('express');
const app = express();
const db = require('./db')
const connection = db.connection
const Port = 4500
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(Port, () => console.log("server em pé"))


app.get('/teste', (req, res) => {
 const query = "SELECT id, texto FROM teste";
 connection.query(query, (err, result, fields) => {
   if (err) {
     console.error('Erro ao executar a consulta:', err);
     throw err;
   }
   let response = 'IDs e textos:\n';
   result.forEach(row => {
     response += `id: ${row.id}, texto: ${row.texto}\n`;
   });
   console.log(result);
   res.json(result); // Envia a resposta como JSON
 });
});
app.post('/adicionar', (req, res) => {
 const texto = req.body.texto; 

 const query = "INSERT INTO teste (texto) VALUES (?)";
 connection.query(query, [texto], (err, result, fields) => {
   if (err) {
     console.error('Erro ao executar a consulta:', err);
     throw err;
   }

   console.log('Texto adicionado:', texto);
   res.send('Texto adicionado com sucesso!');
 });
});
app.delete('/teste/:id', (req, res) => {
 const id = req.params.id;

 const query = "DELETE FROM teste WHERE id = ?";

 connection.query(query, [id], (err, result) => {
   if (err) {
     console.error('Erro ao executar a consulta:', err);
     throw err;
   }

   console.log(`Texto com ID ${id} removido com sucesso`);
   res.send(`Texto com ID ${id} removido com sucesso`);
 });
});
