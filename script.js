const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = "https://api.lyrics.ovh";

// Search by song or artist

async function searchSongs(term) {
    //fetch(`${apiURL}/suggest/${term}`)
   // .then(res=>res.json())
   // .then(data => console.log(data))

    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

//show song and artist in DOM

function showData(data){
    // let output = "";
    // data.data.forEach(song => {
    //     output += `
        
    //     <li>
    //     <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    //     <button class="btn" data-artist="${song.artist.name}"
    //     data-songtitle="${song.title}">
    //     Get Lyrics
    //     </button>
    //     </li>  
    //     `
    // });

    // result.innerHTML= `
    // <ul class="songs">
    // ${output}
    // </ul>
    // `

    result.innerHTML = `
    <ul class="songs">
    ${data.data.map(song => `
    <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}"
        data-songtitle="${song.title}">
        Get Lyrics
        </button>
        </li> 
    `)
.join("")
}
    </ul>
    `

    if(data.prev || data.next){
        more.innerHTML = `
        ${data.prev ? `<button class="btn" 
        onclick="getmoreSongs('${data.prev}')">Prev</button>` : ""}
        ${data.next ? `<button class="btn" 
        onclick="getmoreSongs('${data.next}')">Next</button>` : ""}
        `
    }
    else {
        more.innerHTML = ""
    }
}
// get prev and next result
async function getmoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    
}

//get lyrics for song
 async function getLyrics(artist,songtitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songtitle}`);
    if(res.status === 404)
    {
        alert("Lyrics Not Found ! Try Another song !")
    }
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,"<br>")
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songtitle}</h2>
    <span>${lyrics}</span>`

    more.innerHTML = "";
 } 


//EVENT listener
form.addEventListener('submit',e=> {
    e.preventDefault();

    const searchTerm = search.value.trim();
    console.log(searchTerm);

    if(!searchTerm)
    {
        alert('Please fill in Search Bar')
    }
    else {
        searchSongs(searchTerm)
    }
})


// Get lyrics button click

result.addEventListener('click',e=>{
    const clickedElement = (e.target);

    if(clickedElement.tagName === 'BUTTON') {
        console.log(123)
        const artist = clickedElement.getAttribute('data-artist')
        const songtitle = clickedElement.getAttribute('data-songtitle')

        getLyrics(artist,songtitle);
    }
})