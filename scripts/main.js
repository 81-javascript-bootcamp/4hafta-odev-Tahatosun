import data from "./data.js";
import { searchMovieByTitle, makeBgActive/*, makeBgRandom*/ } from "./helpers.js";

class MoviesApp {
    constructor(options) {
        const { root, searchInput, searchForm, yearHandler, yearSubmitter, yearFilter, genreFilter,genreSubmitter } = options;
        this.$tableEl = document.getElementById(root);
        this.$tbodyEl = this.$tableEl.querySelector("tbody");

        this.$searchInput = document.getElementById(searchInput);
        this.$searchForm = document.getElementById(searchForm);
        this.yearHandler = yearHandler;
        this.$yearSubmitter = document.getElementById(yearSubmitter);
        this.$yearFilter = document.getElementById(yearFilter);

        this.$genreFilter = document.getElementById(genreFilter);
        this.$genreSubmitter = document.getElementById(genreSubmitter);

    }

    createMovieEl(movie) {
        const { image, title, genre, year, id } = movie;
        return `<tr data-id="${id}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`
    }

    createGenreEl(genre, count) {
        return `<div class="form-check">
                    <input class="form-check-input" name="genre" type="checkbox" value="${genre}" >
                    <label class="form-check-label" for="flexCheckDefault">
                    ${genre} (${count})
                    </label>
                </div>`
    }
    createYearEl(year, count) {
        return ` <div class="form-check">
                    <input class="form-check-input" type="radio" name="year" value="${year}">
                    <label class="form-check-label" >
                        ${year} (${count})
                    </label>
                </div>`
    }
    fillTable() {
        /* const moviesHTML = data.reduce((acc, cur) => {
            return acc + this.createMovieEl(cur);
        }, "");*/
        const moviesArr = data.map((movie) => {
            return this.createMovieEl(movie)
        }).join("");
        this.$tbodyEl.innerHTML = moviesArr;
    }

    fillGenreFilter(genres) {
        let genresKeys = Object.keys(genres);
        const genresArr = genresKeys.map((genre) => {
            return this.createGenreEl(genre, genres[genre])
        }).join("");
        this.$genreFilter.innerHTML += genresArr;
    }

    fillYearFilter(years) {
        let yearKeys = Object.keys(years);
        const yearsArr = yearKeys.map((year) => {
            return this.createYearEl(year, years[year])
        }).join("");
        this.$yearFilter.innerHTML += yearsArr;
    }


    getGenres() {
        let genres = [];
        data.forEach((movie) => {
            if (genres[movie.genre] != undefined) {
                genres[movie.genre] += 1;
            }
            else {
                genres[movie.genre] = 1;
            }
        });
        this.fillGenreFilter(genres);
    }


    getYears() {
        let years = [];
        data.forEach((movie) => {
            if (years[movie.year] != undefined) {
                years[movie.year] += 1;
            }
            else {
                years[movie.year] = 1;
            }
        });
        this.fillYearFilter(years);
    }


    reset() {
        this.$tbodyEl.querySelectorAll("tr").forEach((item) => {
            item.style.background = "transparent";
        })
    }


    handleSearch() {
        this.$searchForm.addEventListener("submit", (event) => {

            event.preventDefault();
            this.reset();
            const searchValue = this.$searchInput.value;
            const matchedMovies = data.filter((movie) => {
                return searchMovieByTitle(movie, searchValue);
            }).forEach(makeBgActive)
            this.$searchInput.value="";
        });
    }

    handleYearFilter() {

        this.$yearSubmitter.addEventListener("click", () => {
            document.getElementsByName(`genre`).forEach((genre)=> genre.checked=false);

            this.reset();
            const selectedYear = document.querySelector(`input[name='${this.yearHandler}']:checked`).value
            const matchedMovies = data.filter((movie) => {
                return movie.year === selectedYear;
            }).forEach(makeBgActive)
        });
    }

    handleGenreFilter() {
        this.$genreSubmitter.addEventListener("click", () => {
            document.getElementsByName(`year`).forEach((year)=> year.checked=false);

            this.reset();
            const selectedGenres = document.getElementsByName(`genre`)
            selectedGenres.forEach((genre)=>{
                if(genre.checked){
                    const matchedMovies = data.filter((movie) => {
                        return movie.genre === genre.value;
                    }).forEach(makeBgActive)
                }
               
            })
           
        });
    }

    init() {
        this.fillTable();
        this.handleSearch();
        this.handleYearFilter();
        this.handleGenreFilter();
        this.getGenres();
        this.getYears();
    }
}

let myMoviesApp = new MoviesApp({
    root: "movies-table",
    searchInput: "searchInput",
    searchForm: "searchForm",
    yearHandler: "year",
    yearSubmitter: "yearSubmitter",
    genreFilter: "genre-filter",
    yearFilter: "year-filter",
    genreSubmitter:"genre-submitter"
});

myMoviesApp.init();
