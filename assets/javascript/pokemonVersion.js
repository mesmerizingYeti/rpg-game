let attackMultiplier = 1
let chosen = -1
let defender = -1
let chosenHP = 0
let defenderHP = 0
let unselected = [0, 1, 2, 3]

const hide = x => {
    x.css('height', '0')
    x.css('visibility', 'hidden')
}
const show = x => {
    x.css('height', 'auto')
    x.css('visibility', 'visible')
}

const startBattle = event => {
    console.log('starting battle')
    show($(`.battle-options-row`))
    $('#battle-log').text(`What will ${characters[chosen].name.toUpperCase()} do?`)
    document.getElementsByTagName('body')[0].removeEventListener('click', startBattle)

    $('.battle-option').click(function (event) {
        console.log(this)
        switch ($(this).text()) {
            case 'FIGHT':
                $('#battle-log').text(`${characters[chosen].name} used punch!`)
                defenderHP -= attackMultiplier*characters[chosen].attack
                defenderHP < 0 ? '' : ''
                setTimeout(_ => {
                    $('#battle-log').text(`${characters[defender].name} countered with bitch slap!`)
                }, 1000)
                break
            case 'BAG':
                $('#battle-log').text(`You're too poor to buy items!`)
                break
            case 'POKéMON':
                $('#battle-log').text(`You're too poor to feed more pokémon!`)
                break
            case 'RUN':
                $('#battle-log').text(`Can't escape!`)
                break
            default:
                break
        }
    })
}

// Choose pokemon
const choosePokemon = _ => {
    console.log('running choosePokemon')
    // Show correct div
    hide($('.row').not('.container'))
    show($('#choose-row'))
    hide($('.battle-options-row'))
    // Populate div with unselected characters
    unselected.forEach(x => {
        let char = characters[x]
        let pokeballID = `${char.id}-pokeball`
        // Add pokeball for character
        $('#choose-screen').append(`
            <div id="${char.id}-container">
                <img src="./assets/images/pokeball-still.png" alt="Pokeball" class="px-4 no-outline" id="${pokeballID}" data-index="${x}">
            </div>
        `)
        // Add hover animation for pokeball
        $(`#${pokeballID}`).hover(
            function () {
                $(`#${pokeballID}`).attr('src', './assets/images/pokeball-moving.gif')
            }, function () {
                $(`#${pokeballID}`).attr('src', './assets/images/pokeball-still.png')
            }
        )
        // Add tooltip for pokeball
        tippy(`#${pokeballID}`, {
            arrow: true,
            animation: 'fade',
            allowHTML: true,
            content(reference) {
                console.log(char)
                let popover = document.createElement('div')
                popover.innerHTML = `
                    <img src=${char.img} alt="${char.name}" class="popover-img">
                    <br>
                    <strong>${char.name}</strong>
                `
                return popover
            }
        })
        console.log(`Adding ${char.name}`)
    })
    // Clicking will assign character to chosen or defender
    $(`[id$=-pokeball]`).click(function (event) {
        let index = this.dataset.index
        unselected.splice(unselected.indexOf(index), 1)
        $(this.parentNode).remove()
        console.log(`Chosen: ${chosen}, Defender: ${defender}`)
        // If chosen dosen't exist, else
        if (chosen === -1) {
            chosen = index
            chosenHP = characters[chosen].hp
            $('#choose-screen-title').text(`<h2>Choose your Enemy!</h2>`)
        } else {
            defender = index
            defenderHP = characters[defender].hp
            battle()
        }
    })
}

// ***** Battle *****

const battle = _ => {
    console.log('running battle')
    // Show correct divs
    hide($('.row').not('.container'))
    show($('#battle-row'))
    console.log($('#battle-log-container'))
    show($('#battle-log-container'))
    // Create characters
    let chosenChar = `
        <div id="chosen-container">
            <img src="./assets/images/${characters[chosen].id}-cartoon.png" alt="chosen" id="chosen-img" class="character-img">
        </div>
    `
    let defenderChar = `
        <div id="defender-container">
            <img src="./assets/images/${characters[defender].id}-cartoon.png" alt="defender" id="defender-img" class="character-img">
        </div>
    `
    $(`#battle-row`).append(chosenChar, defenderChar)
    // Setup battle text-box
    $('#battle-log').text(`Wild ${characters[defender].name.toUpperCase()} appeared!`)
    setTimeout(_ => document.getElementsByTagName('body')[0].addEventListener('click', startBattle), 300)

}

// hide choose-screen
// show battle-screen
// setup battle-screen

// ---1---
// Defender moves in from left
// Player moves in from right
// Defender health bar moves in from left faster
// Defender animation/makes noise
// "Wild DEFENDER-NAME appeared!(Bouncing arrow)"

// ---2---
// Go! CHOSEN-NAME!
// Throw pokeball
// Chosen health bar moves in from right faster & chosen animation/makes noise
// `What will               FIGHT       BAG
//  CHOSEN-NAME do?`        POKeMON     RUN



// If win battle, then go back to choosePokemon()
// If lose battle, then lose
const winBattle = _ => {
        unselected.length < 1 ? win() : choosePokemon()
}


// ***** Win *****

// All opponents lost, celebrate then reset game
const win = _ => {
    swal({
        Title: 'You Won!',
        text: 'You defeated all your opponents! Good job!',
        icon: 'success'
    })
    resetGame()
}

// ***** Lose *****

// Lost a battle, mock player then reset game
const lose = _ => {
    swal({
        title: 'You Lost!',
        text: 'You should just give up!',
        icon: 'error'
    })
    resetGame()
}

// ***** Reset *****

// Reset variables, then run choosePokemon()
const resetGame = _ => {
    attackMultiplier = 1
    chosen = -1
    defender = -1
    chosenHP = 0
    defenderHP = 0
    unselected = [0, 1, 2, 3]
    $('#choose-screen-title').html(`<h2>Choose your Character!</h2>`)
    choosePokemon()
}


// Start game
resetGame()