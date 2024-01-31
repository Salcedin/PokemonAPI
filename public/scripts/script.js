$(document).ready(function () {
    var capturar = $('#capturar');
    var resultado = $('#resultado');
    var pokemonInput = $('#pokemonInput');

    function getPokemonData() {
        var pokemonName = pokemonInput.val().toLowerCase();

        if (pokemonName) {
            PokemonPorNombre(pokemonName);
        } else {
            // Utilizamos console.log en lugar de alert para no bloquear la interfaz en dispositivos móviles
            console.log('Por favor, ingresa el nombre de un Pokémon.');
        }
    }

    // Obtener datos al presionar "Enter"
    pokemonInput.keypress(function (e) {
        if (e.which === 13) {
            getPokemonData();
        }
    });

    // Cambiar de click a click y touchstart
    capturar.on('click touchstart', function () {
        getPokemonData();
    });

    $('.typeBtn').on('click touchstart', function () {
        var pokemonType = $(this).data('type');
        PokemonPorTipo(pokemonType);
    });

    function mostrarResultados(data) {
        resultado.empty();
        resultado.append('<h2>Datos del Pokémon:</h2>');

        var formattedData = 'Nombre: ' + data.name + '\nID: ' + data.id + '\nTipo: ' + data.types[0].type.name;
        var spriteUrl = data.sprites.front_default;

        resultado.append('<img src="' + spriteUrl + '" alt="' + data.name + '">');
        resultado.append('<pre>' + formattedData + '</pre>');
    }

    function PokemonPorTipos(data) {
        resultado.empty();
        resultado.append('<h2>Pokémon del tipo ' + data[0].type + ':</h2>');

        // Crear tarjetas para cada Pokémon
        data.forEach(function (pokemon) {
            var card = '<div class="resultado-carta">' +
                '<img src="' + pokemon.sprite + '" alt="' + pokemon.name + '">' +
                '<p>ID: ' + pokemon.id + '</p>' +
                '<p>Nombre: ' + pokemon.name + '</p>' +
                '<p>Tipo: ' + pokemon.type + '</p>' +
                '</div>';

            resultado.append(card);
        });
    }

    async function PokemonPorNombre(pokemonName) {
        try {
            const apiResponse = await $.ajax({
                url: 'http://188.247.146.123:3000/api-data/' + pokemonName,
                type: 'GET',
                dataType: 'json'
            });

            mostrarResultados(apiResponse);
        } catch (error) {
            console.error('Error en la petición al servidor:', error);
        }
    }

    async function PokemonPorTipo(pokemonType) {
        try {
            const apiResponse = await $.ajax({
                url: 'http://188.247.146.123:3000/api-data/type/' + pokemonType,
                type: 'GET',
                dataType: 'json'
            });

            PokemonPorTipos(apiResponse);
        } catch (error) {
            console.error('Error en la petición al servidor:', error);
        }
    }
});
