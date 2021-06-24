function urlCreate() {//Gerando a URL deacordo com o input value
    var pokeDataName = document.querySelector('input#name').value;
    var lowerPokeDataName = pokeDataName.toLowerCase();
    if (pokeDataName >= 898) {
        window.alert('[ERRO] Por favor, insira um número de 1 a 889');
        return;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${lowerPokeDataName}`;
    return getPokemon(url);
}

async function insertPokemonsTips() {//Colocando os autocompletes nos pokémons
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`;
    try {
        var newUrl = await fetch(url);
        var data = await newUrl.json();
        for (let i = 0; i < data.results.length; i++) {
            var option = document.createElement('option');
            option.setAttribute('value', data.results[i].name);
            document.getElementById('chosers').appendChild(option);
        }
    } catch (error) {
        console.log('Um Erro!');
    }

}

var completeUrl = document.querySelector('#sub');
completeUrl.addEventListener('click', urlCreate);

//Rodar quando apertar Enter
var input = document.querySelector('input#name');
input.addEventListener('keydown', event => {
    if (event.key == 'Enter') {
        urlCreate();
    }
})

//Todas as abas
var tabStats = document.querySelector('.tabStats');
tabStats.addEventListener('click', () => {
    //Sumindo com todas as divs
    let details = document.querySelector('.details');
    let tabContainer = document.getElementById('modify');
    let allTabs = tabContainer.querySelectorAll('div');
    let allDivs = details.querySelectorAll('div');
    for (let i = 0; i < allDivs.length; i++) {//"Apagando" as divs
        allDivs[i].style.display = 'none';
    }
    for (let t = 0; t < allTabs.length; t++) {
        allTabs[t].style.backgroundColor = 'rgb(190, 2, 2)';
    }
    //Reiterando as divs
    let attr = document.querySelector('.attr');
    attr.style.display = 'flex';
    attr.style.justifyContent = 'space-around';
    document.querySelector('.st1')
    .style.display = 'initial';
    document.querySelector('.st2')
    .style.display = 'initial';
    tabStats.style.backgroundColor = 'rgb(255, 59, 59)';
    document.querySelector('.about')
    .style.backgroundColor = 'rgb(190, 2, 2)';
})

var tabAbout = document.querySelector('.about');
tabAbout.addEventListener('click', () => {
    let details = document.querySelector('.details');
    let tabContainer = document.getElementById('modify');
    let allTabs = tabContainer.querySelectorAll('div');
    let allDivs = details.querySelectorAll('div');
    for (let i = 0; i < allDivs.length; i++) {//"Apagando" as divs
        allDivs[i].style.display = 'none';
    }
    for (let t = 0; t < allTabs.length; t++) {
        allTabs[t].style.backgroundColor = 'rgb(190, 2, 2)';
    }

    let bodyStats = document.querySelector('.body');
    bodyStats.style.display = 'initial';
    let pokeAttr = document.querySelector('.pokeAttr');
    pokeAttr.style.display = 'initial';
    document.querySelector('.more')
    .style.display = 'initial';
    tabAbout.style.backgroundColor = 'rgb(255, 59, 59)';
})

var tabDesc = document.querySelector('.desc');
tabDesc.addEventListener('click', () => {
    let details = document.querySelector('.details');
    let tabContainer = document.getElementById('modify');
    let allTabs = tabContainer.querySelectorAll('div');
    let allDivs = details.querySelectorAll('div');
    for (let i = 0; i < allDivs.length; i++) {//"Apagando" as divs
        allDivs[i].style.display = 'none';
    }
    for (let t = 0; t < allTabs.length; t++) {
        allTabs[t].style.backgroundColor = 'rgb(190, 2, 2)';
    }

    let div = document.createElement('div');
    let p = document.createElement('p');
    details.appendChild(div);
    div.appendChild(p);
    div.className = 'description';
    p.className = 'desc'
    tabDesc.style.backgroundColor = 'rgb(255,59,59)';
})

//Pegando a URL inicial dos pokémons
async function getPokemon(newUrl) {//Resolve a URL
    try {
        if (typeof newUrl === 'undefined') {
            newUrl = '';
        }
        var resolve = await fetch(newUrl);
        var data = await resolve.json();
        getPokemonData(data);
        run();
    } catch (err) {
        console.log('Me Ignora!');
    }
}

//Colocando os parametros na aba About
function insertTheParams(data) {
    //Inserindo dados
    let miniName = document.querySelector('.name');
    miniName.innerHTML = data.name.toUpperCase();
    let weight = document.querySelector('.weight');
    weight.innerHTML = data.weight/10 + ' kg';
    let height = document.querySelector('.height');
    height.innerHTML = data.height/10 + ' m';
    let id = document.querySelector('.id');
    id.innerHTML = data.id;
    let xp = document.querySelector('.xp');
    xp.innerHTML = data.base_experience;
    //Pegadno as habilidades
    let abl = document.querySelector('.abl');
    abl.innerHTML = '';
    let ablData = data.abilities;
    for (let i = 0; i < ablData.length; i++) {
        abl.innerHTML += ablData[i].ability.name.toUpperCase() + '<br>';
    }
    //Pegando os tipos
    let type = document.querySelector('.types');
    type.innerHTML = '';
    let typeData = data.types;
    for (let i = 0; i < typeData.length; i++) {
        type.innerHTML += typeData[i].type.name.toUpperCase() + '<br>';
    }
    //Adicionando os Status
    let stats = data.stats;
    let getStats = document.querySelectorAll('progress');
    let setStats = document.querySelectorAll('label');
    for (let i = 0; i < getStats.length; i++) {
        getStats[i].setAttribute('value', stats[i].base_stat);
        setStats[i].innerHTML = stats[i].base_stat;
    }
}

var block = false;//Para saber se a div já existe
function getPokemonData(data) {//Mudar o conteúdo primario
    console.log(data);
    var pokeImage = data["sprites"].other["official-artwork"].front_default;//Pokémon Image
    const defaultImg = document.querySelector('div.pokemon');

    if (block === false) {
        //Criando a imagen
        let imgContainer = document.createElement('img');
        defaultImg.appendChild(imgContainer);
        imgContainer.setAttribute('src', pokeImage);
        imgContainer.className = 'pImgContent';
        
        insertTheParams(data);

        block = true;
    } else {
        let img = document.querySelector('img.pImgContent');
        defaultImg.removeChild(img);
        //Repetindo a criação
        let imgContainer = document.createElement('img');
        defaultImg.appendChild(imgContainer);
        imgContainer.setAttribute('src', pokeImage);
        imgContainer.className = 'pImgContent';
        
        insertTheParams(data);
    }
    getSpeciesData(data.species.url);//Pegando mais detalhes sobre o Pokémon
}

async function getSpeciesData(dataNotUsable) {//Fetando o Species
    try {
        let resolve = await fetch(dataNotUsable);
        var data = await resolve.json();
    } catch (error) {
        console.log('error');
    }
    var color = data.color.name;
    var rate = data.capture_rate;
    var leg = data.is_legendary;
    var mith = data.is_mythical;
    var habitat = data.habitat;
    var text = data.flavor_text_entries;
    let p = document.createElement('p');
    let desc = document.querySelector('.description');
    console.log(desc);
    desc.append(p);
    p.innerHTML = text[0].flavor_text;
    
    if (habitat == null) {//Caso não tenha habitat
        document.querySelector('.habitat')
        .innerHTML = 'NONE';
    } else {
        document.querySelector('.habitat')
        .innerHTML = habitat.name;
    }

    if (leg == true || mith == true) {//Para os lendários
        leg = 'YES'
    } else {
        leg = 'NO'
    }

    document.querySelector('.color')
    .innerHTML = color.toUpperCase();
    document.querySelector('.legendary')
    .innerHTML = leg;
    document.querySelector('.rate')
    .innerHTML = rate + '%';

    getEvolutionChain(data.evolution_chain.url);//Pegando as evoluções
}

async function getEvolutionChain(dataNotUsable) {//Fetando o Evolution Chain
    try {
        let resolve = await fetch(dataNotUsable);
        var data = await resolve.json();
    } catch (error) {
        console.log(error);
    }
}

insertPokemonsTips().then()
function run() {
    getPokemon().then()
}