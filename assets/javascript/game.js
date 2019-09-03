let obi = {
    name: 'Obi-Wan Kenobi',
    hp: 120,
    attack: 120,
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
let chosen = -1
let defender = -1
let unselected = [0, 1, 2, 3]
let attackMultiplier = 1
let characterHP = 0
let defenderHP = 0

const restartGame = _ => {
    console.log('restartGame')
    chosen = -1
    defender = -1
    unselected = [0, 1, 2, 3]
    attackMultiplier = 1
    $('#restart-btn').remove()
    $('.card').remove()
    setLog('')
    console.log(characters)
    characters.forEach( x => {
        console.log(`trying to add card ${x.name}`)
        // $('#second-row').append(`
        //     <div class="card shadow text-center bg-success text-white" id="${x.cardID}">
        //         <div class="card-header">${x.name}</div>
        //         <img src="${x.img}" class="card-img-top rounded-0" alt="${x.name}">
        //         <div class="card-text pt-1 pb-1">
        //             <p class="mb-0" id="${x.cardID}-health">${x.hp}</p>
        //         </div>
        //     </div>
        // `)
    })
}

const updateDocument = _ => {
    if (chosen !== -1) {
        $(`#${chosen.cardID}-health`).text(characterHP)
    }
    if (defender !== -1) {
        $(`#${defender.cardID}-health`).text(defenderHP)
    }
}

const addToLog = x => $('#fight-log').append(`<br>${x}`)
const setLog = x => $('#fight-log').text(x)

const chooseDefender = i => {
    defender = i
    defenderHP = characters[i].hp
    unselected.splice( unselected.indexOf(defender), 1)
    $('#sixth-row').append($(`#${characters[defender].cardID}`).remove())
    $(`#${characters[defender].cardID}`).removeClass('bg-danger')
    $(`#${characters[defender].cardID}`).addClass('bg-dark')

    updateDocument()
}

const chooseCharacter = i => {
    chosen = i
    characterHP = characters[i].hp
    unselected.splice( unselected.indexOf(chosen), 1)
    $('#third-row').append($(`#${characters[chosen].cardID}`).remove())
    unselected.forEach( x => $('#fourth-row').append($(`#${characters[x].cardID}`).remove()) )
    $('#fourth-row .card').removeClass('bg-success')
    $('#fourth-row .card').addClass('bg-danger')

    updateDocument()

    $('#fourth-row .card').click( function(event) {
        console.log(event)
        if (defender === -1) {
            console.log(event.currentTarget)
            characters.forEach( (x, i) => (event.currentTarget.id === x.cardID)?chooseDefender(i):'')
        }
    })
}

$('#second-row .card').click( function(event) {
    characters.forEach( (x, i) => ($(this).attr('id') === x.cardID)?chooseCharacter(i):'')
})

$('#attack-btn').click( function(event) {
    console.log(unselected)
    if (chosen !== -1) {
        if (defender !== -1) {
            
            defenderHP -= characters[chosen].attack * attackMultiplier
            setLog(`You attacked ${characters[defender].name} for ${characters[chosen].attack * attackMultiplier}.`)
            if (defenderHP <= 0) {
                 alert('You won!')
                if (unselected.length > 0) {
                    setLog(`You have defeated ${characters[defender].name}, choose another enemy to fight.`)
                } else {
                    setLog('You won!! Click restart to play again.')
                    addToLog(`<button id="restart-btn" class="btn btn-primary">Restart</button>`)

                    $('#restart-btn').click( _ => restartGame())
                }
                $(`#${characters[defender].cardID}`).remove()
                defender = -1
            } else {
                characterHP -= characters[defender].counter
                addToLog(`${characters[defender].name} attacked you back for ${characters[defender].counter}.`)
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