const gameState = ['titleScreen']

async function rpsRequest(playerMove) {
    return {
        async: true,
        crossDomain: true,
        url: `https://rock-paper-scissors7.p.rapidapi.com/?choice=${playerMove}`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64cfafa8dbmsh4b77b2988b4bddep15f639jsn621283b6b4c6',
            'X-RapidAPI-Host': 'rock-paper-scissors7.p.rapidapi.com'
    	}
    }
};

function chooseOpp() {

}

function getOpp() {
    let robot = randomRobot().join(' ')
    var url = `https://robohash.org/${robot}`
    $('#cpuImage').attr('src', url)
    $('#cpuName').text(robot)
}
  
$('#playerButtons').on('click', async (event) => {
    settings = await rpsRequest($(event.target).data('move'))
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
})

$('#startButton').on('click', findMatch)

function findMatch() {
    gameState.push('matchmaking')
    drawGameState()
    getOpp()
    setTimeout(startMatch, (Math.random() * 2000) + 2000)
}

function startMatch() {
    gameState.push('playing')
    drawGameState()
}

function drawGameState() {
    for (i in gameState) {
        var gameStateElements = $(`.${gameState[i]}`); //declare a group of elements with all of the classes in the gameState array
        $.each(gameStateElements, (elem) => {
            $(gameStateElements[elem]).addClass('hidden') //then hide them all
        })

    }
    $(`.${gameState.at(-1)}`).removeClass('hidden') //then only show the current game state elements, the last one in the gameState array

    $('#playersOnline').text(`Robots online: ${howManyRobots()}`) //show how many opps there might be
}

function init() {
    drawGameState()
}

$().ready(init)
