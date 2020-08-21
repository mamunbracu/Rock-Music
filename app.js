document.getElementById('search').addEventListener('click', searchResult)

function searchResult(){
    document.getElementById('lyrics').style.display = "none";
    const song_title = document.getElementById('song_title').value;
    if(song_title == ''){
        alert("Please type song name or title you want");
        document.getElementById('serach-output').style.display = "none";
    }
  
    else{
    document.getElementById('serach-output').style.display = "block";
    fetch(`https://api.lyrics.ovh/suggest/${song_title}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('lyric-name').innerHTML = "";
        dataFetch = data;

      for (let i = 0; i < data.data.length; i++) {
          const title = data.data[i].title;
          
          const albumName = data.data[i].album.title;
          
          document.getElementById('lyric-name').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
          <div class="col-md-9 mx-auto">
              <h3 class="lyrics-name" id="lyric-name">${title}</h3>
              <p class="author lead">Album by <span id="album-name">${albumName}</span></p>
          </div>
          <div class="col-md-3 text-md-right text-center">
              <button class="btn btn-success" onClick=getLyrics(${i})>Get Lyrics</button>
          </div>
      </div>`;
      if(i==9){
          break;
      }
          
      }
    });
}
}

function getLyrics(a){
    const title = dataFetch.data[a].title;
    const artist = dataFetch.data[a].artist.name;
    document.getElementById('lyric-result').innerHTML = "";
    document.getElementById('lyrics').style.display = "block";

    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data =>{
        const lyrics = data.lyrics;
        if(lyrics==undefined){
            alert("No lyrics found");
        }
        else{
         document.getElementById('lyric-result').innerHTML += `${lyrics}`;
        }
    });
}