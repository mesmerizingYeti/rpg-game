let obi = {
    name: 'Obi-Wan Kenobi',
    hp: 1,
    attack: 1,
    counter: 1,
    img: './assets/images/obi-wan-kenobi.png',
    cardID: 'obi-card'
}

let luke = {
    name: 'Luke Skywalker',
    hp: 1,
    attack: 1,
    counter: 1,
    img: './assets/images/luke-skywalker.png',
    cardID: 'luke-card'
}

let sidious = {
    name: 'Darth Sidious',
    hp: 1,
    attack: 1,
    counter: 1,
    img: './assets/images/darth-sidious.png',
    cardID: 'sidious-card'
}

let maul = {
    name: 'Darth Maul',
    hp: 1,
    attack: 1,
    counter: 1,
    img: './assets/images/darth-maul.png',
    cardID: 'maul-card'
}

const characters = [obi, luke, sidious, maul]
let chosenCharacter = ''
let defender = ''
let enemies = []

const chooseCharacter = i => {
    chosenCharacter = characters[i]
    enemies = characters
    enemies.splice(i, 1)
    $('#third-row').append($(`#${chosenCharacter.cardID}`).remove())
    enemies.forEach( x => $('#fourth-row').append($(`#${x.cardID}`).remove()) )
    $('#fourth-row .card').removeClass('bg-success')
    $('#fourth-row .card').addClass('bg-danger')
}

const chooseDefender = i => {
    defender = enemies[i]
    enemies.splice(i, 1)
    
}

$('#second-row .card').click( function(event) {
    characters.forEach( (x, i) => ($(this).attr('id') === x.cardID)?chooseCharacter(i):'')
})

$('#fourth-row .card').click( function(event) {
    if (defender !== '') {

    }
})