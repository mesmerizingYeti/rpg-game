let obi = {
    name: 'Obi-Wan Kenobi',
    hp: 1,
    attack: 1,
    counter: 1,
    img: './assets/images/obi-wan-kenobi.png',
    cardID: '#obi-card'
}

let luke = {
    name: 'Luke Skywalker',
    hp: 1,
    attack: 1,
    counter: 1,
    img: './assets/images/luke-skywalker.png',
    cardID: '#luke-card'
}

let sidious = {
    name: 'Darth Sidious',
    hp: 1,
    attack: 1,
    counter: 1,
    img: './assets/images/darth-sidious.png',
    cardID: '#sidious-card'
}

let maul = {
    name: 'Darth Maul',
    hp: 1,
    attack: 1,
    counter: 1,
    img: './assets/images/darth-maul.png',
    cardID: '#maul-card'
}

const characters = [obi, luke, sidious, maul]
let chosenCharacter = ''
let enemies = []

const chooseCharacter = i => {
    console.log('hello')
    chosenCharacter = characters[i]
    console.log(chosenCharacter)
    enemies = characters
    enemies.splice(i, 1)
    $('#third-row').append($(chosenCharacter.cardID).remove())
    enemies.forEach( x => $('#fourth-row').append($(x.cardID).remove()) )
    $('#fourth-row .card').removeClass('bg-success')
    $('#fourth-row .card').addClass('bg-danger')
}

$('#obi-card').click(function (event) {
    console.log(event)
    chooseCharacter(0)
})
$('#luke-card').click(function (event) {
    console.log(event)
    chooseCharacter(1)
})
$('#sidious-card').click(function (event) {
    console.log(event)
    chooseCharacter(2)
})
$('#maul-card').click(function (event) {
    console.log(event)
    chooseCharacter(3)
})