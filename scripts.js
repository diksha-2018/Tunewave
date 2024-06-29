

const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const titleElement = document.getElementById('title');
const artistElement = document.getElementById('artist');
const coverElement = document.getElementById('cover');
const playerInfo = document.getElementById('player-info');
const controls = document.getElementById('controls');
const playerSection = document.getElementById('playerSection');
const playedSongsList = document.getElementById('playedSongsList');

const homePage = document.getElementById('homePage');
const browsePage = document.getElementById('browsePage');
const myMusicPage = document.getElementById('myMusicPage');
const profilePage = document.getElementById('profilePage');


const homeTab = document.getElementById('homeTab');
const browseTab = document.getElementById('browseTab');
const myMusicTab = document.getElementById('myMusicTab');
const profileTab = document.getElementById('profileTab');


let songs = [];
let playedSongs = [];
let currentSongIndex = 0;

function loadSong(song) {
   
    titleElement.textContent = song.title;
    artistElement.textContent = song.artist;
    audio.src = song.src;
    coverElement.src = song.cover;

    playerInfo.style.display = 'block';
    controls.style.display = 'flex';


    // Play the audio
    audio.play();
    playButton.textContent = '❚❚';

    // Add the song to the played songs list if not already added
    addToPlayedSongs(song);
}

// Function to add a song to the played songs list
function addToPlayedSongs(song) {
    // Check if the song is already in playedSongs
    if(!playedSongs){
        
    }
    const found = playedSongs.some(item => item.src === song.src);
    if (!found) {
        playedSongs.push(song);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    showPage('homePage');
});


homeTab.addEventListener('click', function (event) {
    event.preventDefault();
    showPage('homePage');
});

browseTab.addEventListener('click', function (event) {
    event.preventDefault();
    showPage('browsePage');
});

// Event listener for My Music button click

myMusicTab.addEventListener('click', function (event) {
    event.preventDefault();
    showPage('myMusicPage')
    displayPlayedSongs();
});

profileTab.addEventListener('click', function (event) {
    event.preventDefault();
    showPage('profilePage');
});


// Function to display played songs in the My Music container
function displayPlayedSongs() {


    // Clear previous list
    playedSongsList.innerHTML = '';

     // Create and append the heading element
    const heading = document.createElement('h2');
    heading.textContent = 'Played Songs';
    playedSongsList.appendChild(heading);

    if (playedSongs.length === 0) {
        // Display a message if the played songs list is empty
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'My Music list is empty';
        playedSongsList.appendChild(emptyMessage);
    }

    // Populate the playedSongsList with each played song
    else {
        playedSongs.forEach(song => {
            const listItem = document.createElement('li');

            const imgElement = document.createElement('img');
            imgElement.src = song.cover;

            const textElement = document.createElement('div');
            textElement.textContent = `${song.title} - ${song.artist}`;

            listItem.appendChild(imgElement);
            listItem.appendChild(textElement);

            playedSongsList.appendChild(listItem);
        });
    }

    // Show the My Music list
    playedSongsList.style.display = 'block';
}

// Example function to clear the player (replace with your own logic)
function clearPlayer() {
    titleElement.textContent = '';
    artistElement.textContent = '';
    audio.src = '';
    coverElement.src = '';
    playButton.textContent = '►';
    playerInfo.style.display = 'block';
    controls.style.display = 'none';
}


async function searchSongs() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (!searchInput) {
        console.error('Search query is empty');
        return;
    }
    songs = [];
    currentSongIndex = 0;
    clearPlayer();

    const apiKey = '89c0fd3a63msh1ac22a4d541fb83p17c8d1jsn1c0e90bf16c4';
    const apiUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(searchInput)}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const fetchData = await response.json();
        if (!fetchData || !fetchData.data || fetchData.data.length === 0) {
            throw new Error('No tracks found');
        }
        fetchData.data.forEach(track => {
            songs.push({
                title: track.title,
                artist: track.artist.name,
                src: track.preview,
                cover: track.album.cover
            });
        });
        loadSong(songs[currentSongIndex]);
        showPage('homePage');
    } catch (error) {
        console.error('Error fetching songs:', error);
    }

}

function addToPlayedSongs(song) {
    // Check if the song is already in playedSongs
    const found = playedSongs.some(item => item.src === song.src);
    if (!found) {
        playedSongs.push(song);
    }
}
function showPage(pageName) {
    const pages = ['homePage', 'browsePage', 'myMusicPage', 'profilePage'];

    pages.forEach(id => {
        const page = document.getElementById(id);
        if (page) {
            page.style.display = id === pageName ? 'block' : 'none';
        }
    });
     // Hide the My Music list if not on the My Music page
     if (pageName !== 'myMusicPage') {
        playedSongsList.style.display = 'none';
    }
}



function playPauseSong() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = '❚❚';
    } else {
        audio.pause();
        playButton.textContent = '►';
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playButton.textContent = '❚❚';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playButton.textContent = '❚❚';
}

console.log(playedSongs);

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    alert(`Login successful for username: ${username}`);
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    alert(`Signup successful for username: ${username}, email: ${email}`);
});

document.getElementById('switchToSignup').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signup').checked = true;
});

document.getElementById('switchToLogin').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login').checked = true;
});
