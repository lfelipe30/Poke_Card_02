
//RETORNA A LISTA DOS POKEMONS NO SELECT
const fetchPokemon = () =>{
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for(let i = 1; i <= 80; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
      .then(pokemons => {

        const listPokemons = pokemons.reduce((accumulator, pokemon) => {

        accumulator += `
             
                <option>${pokemon.name}</option>

            `
            return accumulator

        }, '')

        const ul = document.querySelector('[data-js="pokedexK"]')
        ul.innerHTML = listPokemons

      
      })
}

//CHAMADA DO MÉTODO
fetchPokemon()


//CARREGA TABELA COM POKEMON SELECIONADO
//O MÉTODO PEGA VALOR VAI PEGAR O POKEMON SELECIONADO, MÉTODO CHAMADO NO SELECT
function pegavalor(){

  const fetchTable = () =>{

    var select = document.querySelector('select');
    var option = select.children[select.selectedIndex];
    var texto = option.textContent;

    const getPokemonUrl = () => `https://pokeapi.co/api/v2/pokemon/${texto}`

    const pokemonPromises = []

   
    pokemonPromises.push(fetch(getPokemonUrl()).then(response => response.json()))
 

    Promise.all(pokemonPromises)
      .then(pokemons => {

        const listPokemons = pokemons.reduce((accumulator, pokemon) => {

          accumulator += `

          <div class="Card">
          <div class="Title">Pokemon</div>
          <div class="Content" data-js="pokedex">
              <p>Id: ${pokemon.id}</p>
              <p>Name: ${pokemon.name}</p>
              <p>Experience: ${pokemon.base_experience}</p>
              <p>Weight: ${pokemon.weight}</p>
              <p>Order: ${pokemon.order}</p>
              <p>Abilities: ${pokemon.abilities.map(item => item.ability.name)}</p>
              <p> 
                <img src="${pokemon.sprites.front_default}">
                <img src="${pokemon.sprites.back_shiny}">
              </p>
          </div>
          </div>

        `
        return accumulator

        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = listPokemons
      
      })
}

//CHAMADA DO METODO
fetchTable()
}
