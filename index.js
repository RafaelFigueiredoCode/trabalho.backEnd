const express = require('express'); 
const os = require('os');
const chalk = require('chalk');
const axios = require('axios');

const app = express();
const port = 4000;
app.use(express.json());

console.log('Bem-Vindo ao mundo do Node.js, Rafael!');
console.log('Sistema Operacional:', os.type());
console.log('Memória Total:', os.totalmem());
console.log('Tempo de Atividade (s):', os.uptime());

console.log(chalk.green('\nMensagem de Sucesso'));
console.log(chalk.red('\nMensagem de Erro'));
console.log(chalk.blue('\nMensagem Informativa'));

async function BuscarPokemon(nome){
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`);
        const { name, types, abilities, weight } = response.data;
        console.log(`\nNome: ${name}`);
        console.log(`Tipo: ${types.map(t => t.type.name).join(', ')}`);
        console.log(`Peso: ${weight}`);
        console.log(`Habilidades: ${abilities.length}`);
    } catch(err) {
        console.error('❌ Erro ao buscar dados:', err.message);
    }
}

BuscarPokemon('pikachu');
BuscarPokemon('moltres');
BuscarPokemon('articuno');

app.get('/', (req, res) => {
    res.send('Servidor Node rodando com Sucesso!');
});

app.get('/hora', (req, res) => {
    const horaAtual = new Date().toLocaleTimeString('pt-BR');
    console.log(horaAtual);
    res.send(`Hora Atual: ${horaAtual}`);
});

app.get('/pokemon/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`);
        const { name, types, weight } = response.data;

        res.json({
            nome: name,
            tipos: types.map(t => t.type.name),
            peso: weight  
        });
    } catch(err) {
        res.status(404).json({ erro: err.message });
    }
});

app.listen(port, () => {
    console.log(`Rodando na porta http://localhost:${port}`);
});