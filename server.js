const express = require('express');

const app = express()
const port = 4000

let items = []
app.use(express.json());

app.get('/', (req, res) => {
    res.json(items[0])
})

app.post('/', (req, res) => {
    try {
    items.push(req.body.name);
    console.log(req.body);
    res.send(`Criado o Dado de ${req.body.name}`);
    }
    catch (err) {
    console.log(err);
    res.status(500).send('Erro ao Criar Dado')
      }
   }
)
app.listen(port, () => {
    console.log(`rodando na porta http://localhost:${port}`)
})
