const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/scripts', express.static('public/scripts', { 'Content-Type': 'application/javascript' }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api-data/:pokemonName', async (req, res) => {
    try {
        const pokemonName = req.params.pokemonName;
        const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error en la petición a la API:', error);
        res.status(500).json({ error: 'Error en la petición a la API' });
    }
});

app.get('/api-data/type/:type', async (req, res) => {
    try {
        const type = req.params.type;
        const respuestaAPI = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        
        // Extraer los detalles de los Pokémon del tipo desde la respuesta de la API
        const pokemonDetails = respuestaAPI.data.pokemon.map(pokemon => ({
            id: pokemon.pokemon.url.split('/').reverse()[1],
            name: pokemon.pokemon.name,
            type: type,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split('/').reverse()[1]}.png`
        }));

        res.json(pokemonDetails);
    } catch (error) {
        console.error('Error en la petición a la API:', error);
        res.status(500).json({ error: 'Error en la petición a la API' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
