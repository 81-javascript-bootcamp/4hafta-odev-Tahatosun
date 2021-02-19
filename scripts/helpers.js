export const searchMovieByTitle = (movie, searchValue) => {
    return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
}

export const makeBgActive = (movie) => {
    document.querySelector(`tr[data-id='${movie.id}']`).style.background = "#d7f0f7";
}

/* Birden fazla genre ile filtreleme yapıldığında tabloda bulunan her genre için random bir arka plan rengi atar
let tempGenre;
let randomColor = "";

export const makeBgRandom = (movie) => {

    if(tempGenre != movie.genre){
         randomColor = Math.floor(Math.random()*16777215).toString(16);
    }   

    document.querySelector(`tr[data-id='${movie.id}']`).style.background = `#${randomColor}`;
    tempGenre=movie.genre;
}
*/
