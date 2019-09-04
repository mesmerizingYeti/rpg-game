let chosen = -1
let defender = -1
let unselected = []
let attackMultiplier = 1
let characterHP = 0
let defenderHP = 0

const addToLog = x => $('#fight-log').append(`<br>${x}`)
const setLog = x => $('#fight-log').text(x)
const hide = x => {
    x.css('height', '0')
    x.css('visibility', 'hidden')
}
const show = x => {
    x.css('height', 'auto')
    x.css('visibility', 'visible')
}
const updateDocument = _ => {
    chosen !== -1 ? $(`#${characters[chosen].cardID}-health`).text(characterHP) : ''
    defender !== -1 ? $(`#${characters[defender].cardID}-health`).text(defenderHP) : ''
}

const chooseCharacter = event => {
    // Iterate thru characters and find the chosen character using event
    characters.forEach((x, i) => {
        if (event.currentTarget.id === x.cardID) {
            chosen = i
            characterHP = characters[i].hp
            // Remove chosen charcter from unselected
            unselected.splice(unselected.indexOf(chosen), 1)
            // Move chosen's card to chosen div
            $('#chosen').append($(`#${characters[chosen].cardID}`).remove())
            // Move all other cards to fourth-row
            unselected.forEach(y => $('#enemy-row').append($(`#${characters[y].cardID}`).remove()))
            $('#enemy-row .card').removeClass('bg-success')
            $('#enemy-row .card').addClass('bg-danger')
            // Add click function to card's in fourth-row
            $('#enemy-row .card').click(function (event) {
                defender === -1 ? chooseDefender(event) : ''
            })
        }
    })
    hide($('[id^=character-row]'))
    show($('[id^=enemy-row]'))
    updateDocument()
}

const chooseDefender = event => {
    // Iterate thru characters and find the defender using event
    characters.forEach((x, i) => {
        if (event.currentTarget.id === x.cardID) {
            defender = i
            defenderHP = characters[i].hp
            // Remove defender from unselected
            unselected.splice(unselected.indexOf(defender), 1)
            // Move defender's card to defender div
            $('#defender').append($(`#${characters[defender].cardID}`).remove())
            $(`#${characters[defender].cardID}`).removeClass('bg-danger')
            $(`#${characters[defender].cardID}`).addClass('bg-dark')
        }
    })
    hide($('[id^=enemy-row]'))
    show($('[id^=battle-row]'))
    show($('#fight-log-row'))
    updateDocument()
}

$('#attack-btn').click( function(event) {
    if (chosen !== -1) {
        if (defender !== -1) {
            // Chosen attacks defender
            defenderHP -= characters[chosen].attack * attackMultiplier
            setLog(`You attacked ${characters[defender].name} for ${characters[chosen].attack * attackMultiplier}.`)
            // Defender is defeated
            if (defenderHP <= 0) {
                if (unselected.length > 0) {
                    swal({
                        text: `You have defeated ${characters[defender].name}, choose another enemy to fight.`,
                        button: 'Roger, roger'
                    })
                    setLog('')
                    hide($('[id^=battle-row]'))
                    hide($('#fight-log-row'))
                    show($('[id^=enemy-row]'))
                } else {
                    // Win condition - all enemies defeated
                    setLog('You won!!')
                    swal({
                        title: 'You won!',
                        text: 'Click restart to play again.',
                        icon: 'success'
                    })
                    // Add restart game button
                    addToLog(`<button id="restart-btn" class="btn btn-primary">Restart</button>`)
                    $('#restart-btn').click(_ => restartGame())
                }
                $(`#${characters[defender].cardID}`).remove()
                defender = -1
            } else {
                // Defender counter attacks
                characterHP -= characters[defender].counter
                addToLog(`${characters[defender].name} attacked you back for ${characters[defender].counter}.`)
                if (characterHP <= 0) {
                    // Lose condition
                    swal({
                        title: 'You lost :(',
                        text: 'Click restart to try again.',
                        icon: 'error'
                    })
                    addToLog(`<button id="restart-btn" class="btn btn-primary">Restart</button>`)
                    $('#restart-btn').click(_ => restartGame())
                }
            }
            attackMultiplier++
            updateDocument()
    
        } else {
            swal({
                text: 'Choose a defender first!',
                icon: 'warning'
            })
        }
    } else {
        swal({
            text: 'Choose your character first!',
            icon: 'warning'
        })
    }
})

const restartGame = _ => {
    chosen = -1
    defender = -1
    // Initialize array for indices of all characters
    unselected = []
    for (let i = 0; i < characters.length; i++) {
        unselected.push(i)
    }
    attackMultiplier = 1
    $('#restart-btn').remove()
    $('.card').remove()
    setLog('')
    // Add card for each character to second-row
    characters.forEach(x => {
        $('#character-row').append(`
            <div class="card shadow text-center bg-success text-white" id="${x.cardID}">
                <div class="card-header">${x.name}</div>
                <img src="${x.img}" class="card-img-top rounded-0" alt="${x.name}">
                <div class="card-text pt-1 pb-1">
                    <p class="mb-0" id="${x.cardID}-health">${x.hp}</p>
                </div>
            </div>
        `)

    })
    hide($('.row'))
    show($('#title-row,#character-row-title,#character-row'))
    // Add click function to every card in second-row
    $(`#character-row .card`).click(function (event) {
        chooseCharacter(event)
    })
}

restartGame()