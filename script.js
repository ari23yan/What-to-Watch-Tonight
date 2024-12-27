let pageNum = 1; // Define pageNum globally
let genreId = 'Popular'; // Default genre ID, or set it dynamically later

document.querySelectorAll('.sliderPage-next').forEach(function (button) {
    button.addEventListener('click', function () {
        pageNum++; // Increment pageNum globally
        getMoviesList(genreId, pageNum); // Pass updated pageNum
    });
});
document.querySelectorAll('.sliderPage-perv').forEach(function (button) {
    button.addEventListener('click', function () {
        pageNum--; // Increment pageNum globally
        getMoviesList(genreId, pageNum); // Pass updated pageNum
    });
});

document.getElementById('genreSelect').addEventListener('change', function() {
    genreId = this.value; // Update genreId globally
    pageNum = 1; // Reset to the first page when genre changes
    getMoviesList(genreId, pageNum);
});

window.addEventListener("load", (event) => {
    getMoviesList(genreId, pageNum); // Load with default genre and page
});


async function getMoviesList(genreId, pageNum) {
    const apiKey = 'd9e68e8ae2baa619ea73ae10ad596101';
    var url = '';
   if(genreId === "Popular")
   {
     url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNum}include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
   }else
   {
     url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US&page=${pageNum}`;
   }
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        var movies = res.results;
        slider(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}
async function movieDetail(movieName) {
    const searchQuery = encodeURIComponent(movieName); // Encode movie name for URL
    const googleSearchUrl = `https://www.google.com/search?q=Movie ${searchQuery}`; // Construct Google search URL
    window.open(googleSearchUrl, '_blank'); // Open search in a new tab
}   
async function slider(data) {
    var div = document.getElementById('mainSlider');
    var loader = document.getElementById('loaderIcon');
    loader.classList.remove('d-none'); // Hide loader after images are loaded
    let currentNode = div.firstChild;
    while (currentNode) {
        if (currentNode !== loader) {
            let nextNode = currentNode.nextSibling; // Get the next sibling before removing
            div.removeChild(currentNode); // Remove current node
            currentNode = nextNode; // Move to the next sibling
        } else {
            currentNode = currentNode.nextSibling; // Skip the loader
        }
    }
    setTimeout(() => {
        try {
            let str = '';
            for (let i = 0; i < 5 && i < data.length; i++) {
                const movieName = data[i].original_title; // Get movie name
                const imagePath = data[i].poster_path.replace(/^\//, '');
                const imageUrl = `https://corsproxy.io/?${encodeURIComponent(`https://image.tmdb.org/t/p/w780/${imagePath}`)}`;

                // Create movie card element
                const card = document.createElement('div');
                card.classList.add('gallery-card');
                card.setAttribute('data-name', 'Portrait 3');

                // Add click event listener for the card
                card.addEventListener('click', () => movieDetail(movieName));

                // Add image to card
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = movieName;

                // Add movie name to card
                const nameDiv = document.createElement('div');
                nameDiv.classList.add('image-name');
                nameDiv.textContent = movieName;

                // Append image and name to the card
                card.appendChild(img);
                card.appendChild(nameDiv);

                // Append card to the container
                div.appendChild(card);
            }
        } catch (error) {
            console.error('Error loading images:', error);
        } finally {
            loader.classList.add('d-none'); // Hide loader after images are loaded
        }
    }, 900); // Delay of 0.9 seconds
}
