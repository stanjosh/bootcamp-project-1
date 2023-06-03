
const apiUrl = "https://api.publicapis.org/entries"


async function getApis() {
    var resp = await fetch(apiUrl)
    var data = await resp.json()
    console.log(data.entries)
    return data.entries
}

async function drawApis() {
    var entries = await getApis()
    for (var i in entries) {
        var row = $(`<tr></tr>`)
        var cell1 =$(
            `<td><a href=${entries[i].Link}>${entries[i].API}</a></td>`)
        var cell2 =$(`<td>${entries[i].Description}</td>`)
        var cell3 =$(`<td>${entries[i].Category}</td>`)
        $('#apiTable').append(row)
        $(row).append(cell1)
        $(row).append(cell2)
        $(row).append(cell3)
    }
}

const techyUrl = "https://techy-api.vercel.app/api/json";
const nasaUrl = "https://epic.gsfc.nasa.gov/api/enhanced"

async function newAdvice() {
    const resp = await fetch(techyUrl);
    const quote = await resp.json()
    $('#quote').text(`"${quote.message}!"`)
}

async function newImage() {
    $('body').addClass('clear')   
    var index = Math.floor(Math.random() * 19)
    const resp = await fetch(nasaUrl);
    await resp.json()
    .then((images) => {
        var dateTime = dayjs(images[index].date)
        var day = dateTime.format('DD')
        var month = dateTime.format('MM')
        var year = dateTime.format('YYYY')
        var image = `https://epic.gsfc.nasa.gov/archive/enhanced/${year}/${month}/${day}/png/${images[index].image}.png`
        $('body').css('background-image', `url("${image}")`)
        newAdvice()
        setTimeout(() => {

            $('body').removeClass('clear');
        }, 1500)

    
    })
}
    

$('#newStuff').on('click', () => {
    newImage()
    drawApis()
})


