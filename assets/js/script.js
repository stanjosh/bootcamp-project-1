
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

  
$('#playerButtons').on('click', async (event) => {
    settings = await rpsRequest($(event.target).data('move'))
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
})


