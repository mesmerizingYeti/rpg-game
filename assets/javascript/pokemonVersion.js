let attackMultiplier = 1
let chosen = -1
let defender = -1
let unselected = []

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
    // Show correct div
    hide($('div').not('.container'))
    show($('#choose-screen'))
    // Populate div
    unselected.forEach(x => {
        $('#choose-screen').append(`
            
        `)
    })


    // Add click functionality

}


// Choose opponent

// Battle

// Win

// Lose

// Reset


show($('#choose-screen'))
hide($('#battle-screen'))