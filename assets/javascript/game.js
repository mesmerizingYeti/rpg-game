let chosen = -1
let defender = -1
let unselected = []
let attackMultiplier = 1
let characterHP = 0
let defenderHP = 0

const addToLog = x => $('#fight-log').append(`<br>${x}`)
const setLog = x => $('#fight-log').text(x)
const updateDocument = _ => {
    chosen !== -1 ? $(`#${characters[chosen].cardID}-health`).text(characterHP) : ''
    defender !== -1 ? $(`#${characters[defender].cardID}-health`).text(defenderHP) : ''
}

const chooseDefender = event => {
    // Iterate thru characters and find the defender using event
    characters.forEach((x, i) => {
        if (event.currentTarget.id === x.cardID) {
            defender = i
            defenderHP = characters[i].hp
            // Remove defender from unselected
            unselected.splice(unselected.indexOf(defender), 1)
            // Move defender's card to sixth-row
            $('#sixth-row').append($(`#${characters[defender].cardID}`).remove())
            $(`#${characters[defender].cardID}`).removeClass('bg-danger')
            $(`#${characters[defender].cardID}`).addClass('bg-dark')
        }
    })
    updateDocument()
}

const chooseCharacter = event => {
    // Iterate thru characters and find the chosen character using event
    characters.forEach((x, i) => {
        if (event.currentTarget.id === x.cardID) {
            chosen = i
            characterHP = characters[i].hp
            // Remove chosen charcter from unselected
            unselected.splice(unselected.indexOf(chosen), 1)
            // Move chosen's card to third-row
            $('#third-row').append($(`#${characters[chosen].cardID}`).remove())
            // Move all other cards to fourth-row
            unselected.forEach(y => $('#fourth-row').append($(`#${characters[y].cardID}`).remove()))
            $('#fourth-row .card').removeClass('bg-success')
            $('#fourth-row .card').addClass('bg-danger')
            // Add click function to card's in fourth-row
            $('#fourth-row .card').click(function (event) {
                (defender === -1) ? chooseDefender(event) : ''
            })
        }
    })
    updateDocument()
}

$('#attack-btn').click(function (event) {
    if (chosen !== -1) {
        if (defender !== -1) {
            // Chosen attacks defender
            defenderHP -= characters[chosen].attack * attackMultiplier
            setLog(`You attacked ${characters[defender].name} for ${characters[chosen].attack * attackMultiplier}.`)
            // Defender is defeated
            if (defenderHP <= 0) {
                alert('You won!')
                if (unselected.length > 0) {
                    setLog(`You have defeated ${characters[defender].name}, choose another enemy to fight.`)
                } else {
                    // Win condition - all enemies defeated
                    setLog('You won!! Click restart to play again.')
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
        $('#second-row').append(`
            <div class="card shadow text-center bg-success text-white" id="${x.cardID}">
                <div class="card-header">${x.name}</div>
                <img src="${x.img}" class="card-img-top rounded-0" alt="${x.name}">
                <div class="card-text pt-1 pb-1">
                    <p class="mb-0" id="${x.cardID}-health">${x.hp}</p>
                </div>
            </div>
        `)

    })
    // Add click function to every card in second-row
    $(`#second-row .card`).click(function (event) {
        chooseCharacter(event)
    })
}

restartGame()