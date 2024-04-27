
async function getPokemonData(){
    let pokemonApiUrlBase = "https://pokeapi.co/api/v2/pokemon/" ;
    let pokemonID = Math.floor(Math.random() * 1025) + 1;

    let fullApiUrl = pokemonApiUrlBase + pokemonID;

    let response = await fetch(fullApiUrl);
    let responseData = await response.json();
    let result = responseData;

    // let promiseResponse = await fetch(fullApiUrl).then(response => {
    //     return response.json();
    // })

    // result = promiseResponse;

    return result;

}

async function putDataOnPage(dataToDisplay){
    document.querySelector(".pokemonName").textContent = dataToDisplay.name;

    let type1Display = document.querySelector(".pokemonType1");
    let type2Display = document.querySelector(".pokemonType2");

    type1Display.textContent = "Type 1: " + dataToDisplay.types[0].type.name;

    if (dataToDisplay.types[1]){
        // If second element exists, set second type display
        type2Display.textContent = "Type 2: " + dataToDisplay.types[1].type.name;
    }
    else{
        type2Display.textContent = "";
    }

    let imageElement = document.querySelector(".pokemonImage img")

    let shinyResult = Math.floor(Math.random() * 4) + 1;

    if (shinyResult == 1){
        imageElement.src = dataToDisplay.sprites.other.showdown.front_shiny;
        console.log("SHINY!")
    }
    else {
        imageElement.src = dataToDisplay.sprites.other.showdown.front_default;
    }


    let cryURL = dataToDisplay.cries.latest;
    let pokemonAudioElement = document.querySelector(".pokemonCry audio")

    pokemonAudioElement.src = cryURL;

    let pokemonAudioPlayButton = document.querySelector(".pokemonCry");

    pokemonAudioPlayButton.addEventListener("click", () => {
        pokemonAudioElement.volume = 0.1;
        pokemonAudioElement.play();
    })
}


// Button calls this function
async function getAndDisplayPokemonData(){
    let data = await getPokemonData();
    console.log(data);
    putDataOnPage(data);
}


async function generateTeamData(){
    // let teamArray = [];

    // for (let index = 0; index < 6; index++) {
    //     let data = await getPokemonData();
    //     teamArray.push(data);
    // }

    let promiseAllResult = await Promise.all([
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData()
    ]);

    return promiseAllResult;
}

async function showTeamData(){

}

async function getAndShowTeamData(){
    let teamData = await generateTeamData();
    showTeamData(teamData);
    console.log(teamData)
}

document.getElementById("create-team").addEventListener("click", getAndShowTeamData);

document.querySelector("#create-encounter").addEventListener("click", getAndDisplayPokemonData);