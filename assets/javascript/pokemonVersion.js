let attackMultiplier = 1
let chosen = -1
let defender = -1
let unselected = [0, 1, 2, 3]

const hide = x => {
    x.css('height', '0')
    x.css('visibility', 'hidden')
}
const show = x => {
    x.css('height', 'auto')
    x.css('visibility', 'visible')
}

// Choose pokemon
const choosePokemon = _ => {
    console.log('running choosePokemon')
    // Show correct div
    hide($('.row').not('.container'))
    show($('#choose-row'))
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
            function() {
                $(`#${pokeballID}`).attr('src', './assets/images/pokeball-moving.gif')
            }, function() {
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
    $(`[id$=-pokeball]`).click(function(event) {
        let index = this.dataset.index
        // If chosen dosen't exist, else
        if (chosen === -1) {
            chosen = index
            $('#choose-screen-title').html(`<h2>Choose your Enemy!</h2>`)
        } else {
            defender = index
        }
        unselected.splice(unselected.indexOf(index), 1)
        $(this.parentNode).remove()
        console.log(`Chosen: ${chosen}, Defender: ${defender}`)
    })
}

// ***** Battle *****

// hide choose-screen
// show battle-screen
// setup battle-screen
// animations for both attack and counter-attack
// 4 buttons with text log
// 1. Attack:  attack opponent, receive counter attack
// 2. Item:    nothing, some snarky reply
// 3. Pokemon: nothing (unless have time)
// 4. Run:     can not escape

// If win battle, then go back to choosePokemon()
// If lose battle, then lose

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
    unselected = [0, 1, 2, 3]
    $('#choose-screen-title').html(`<h2>Choose your Character!</h2>`)
    choosePokemon()
}


// Start game
resetGame()