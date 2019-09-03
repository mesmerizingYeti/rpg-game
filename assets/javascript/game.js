let obi = {
    name: 'Obi-Wan Kenobi',
    hp: 120,
    attack: 8,
    counter: 10,
    img: './assets/images/obi-wan-kenobi.png',
    cardID: 'obi-card'
}

let luke = {
    name: 'Luke Skywalker',
    hp: 100,
    attack: 8,
    counter: 5,
    img: './assets/images/luke-skywalker.png',
    cardID: 'luke-card'
}

let sidious = {
    name: 'Darth Sidious',
    hp: 150,
    attack: 12,
    counter: 20,
    img: './assets/images/darth-sidious.png',
    cardID: 'sidious-card'
}

let maul = {
    name: 'Darth Maul',
    hp: 180,
    attack: 15,
    counter: 25,
    img: './assets/images/darth-maul.png',
    cardID: 'maul-card'
}

const characters = [obi, luke, sidious, maul]
let chosenCharacter = ''
let defender = ''
let enemies = []
let attackMultiplier = 1
let characterHP = 0
let defenderHP = 0

const restartGame = _ => {

}

const updateDocument = _ => {
    if (chosenCharacter !== '') {
        $(`#${chosenCharacter.cardID}-health`).text(characterHP)
    }
    if (defender !== '') {
        $(`#${defender.cardID}-health`).text(defenderHP)
    }
}

const addToLog = x => $('#fight-log').append(`<br>${x}`)
const setLog = x => $('#fight-log').text(x)

const chooseDefender = i => {
    defender = enemies[i]
    defenderHP = enemies[i].hp
    enemies.splice(i, 1)
    $('#sixth-row').append($(`#${defender.cardID}`).remove())
    $(`#${defender.cardID}`).removeClass('bg-danger')
    $(`#${defender.cardID}`).addClass('bg-dark')

    updateDocument()
}

const chooseCharacter = i => {
    chosenCharacter = characters[i]
    characterHP = characters[i].hp
    enemies = characters
    enemies.splice(i, 1)
    $('#third-row').append($(`#${chosenCharacter.cardID}`).remove())
    enemies.forEach( x => $('#fourth-row').append($(`#${x.cardID}`).remove()) )
    $('#fourth-row .card').removeClass('bg-success')
    $('#fourth-row .card').addClass('bg-danger')

    updateDocument()

    $('#fourth-row .card').click( function(event) {
        console.log(event)
        if (defender === '') {
            console.log(event.currentTarget)
            characters.forEach( (x, i) => (event.currentTarget.id === x.cardID)?chooseDefender(i):'')
        }
    })
}

$('#second-row .card').click( function(event) {
    characters.forEach( (x, i) => ($(this).attr('id') === x.cardID)?chooseCharacter(i):'')
})

$('#attack-btn').click( function(event) {
    if (chosenCharacter !== '') {
        if (defender !== '') {
            
            defenderHP -= chosenCharacter.attack * attackMultiplier
            setLog(`You attacked ${defender.name} for ${chosenCharacter.attack * attackMultiplier}.`)
            if (defenderHP <= 0) {
                 alert('You won!')
                if (enemies.length > 0) {
                    setLog(`You have defeated ${defender.name}, choose another enemy to fight.`)
                } else {
                    setLog('You won!! Click restart to play again.')
                    addToLog(`<button id="restart-btn" class="btn btn-primary" onclick="restartGame">Restart</button>`)
                }
                $(`#${defender.cardID}`).remove()
                defender = ''
            } else {
                characterHP -= defender.counter
                addToLog(`${defender.name} attacked you back for ${defender.counter}.`)
                if (characterHP <= 0) {
                    alert('You lose!')
                }
            }
            attackMultiplier++
            updateDocument()

        } else {
            alert('Choose a defender first!')
        }
    } else {
        alert('Choose your character first!')
    }
})

// $('#fourth-row .card').click( function(event) {
//     console.log(event)
//     if (defender === '') {
//         console.log('passed')
//         characters.forEach( (x, i) => ($(this).attr('id' === x.cardID)?chooseDefender(i):''))
//     }
// })