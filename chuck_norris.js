const axios = require('axios');

async function ApiChuckNorris(){
    try{
     const piada = await axios.get(`https://api.chucknorris.io/jokes/random`);
     console.log('piada:', piada.data.value)
    } catch(err){
        console.error('❌ Erro ao buscar dados:', err.message);
    }
}

ApiChuckNorris()

