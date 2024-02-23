document.addEventListener("DOMContentLoaded", function() {
    const stressLevels = document.querySelectorAll('.stress-levels a');
    const gamesContainer = document.getElementById('gamesContainer');

    // Function to fetch games based on stress level
    function fetchGames(stressLevel) {
        const games = {
            low: [
                { name: 'Bubble Shooter', url: 'https://www.silvergames.com/en/bubble-shooter', image: 'images/bubbleShooter.jpg' },
                { name: 'Classic Mahjong', url: 'https://www.silvergames.com/en/classic-mahjong', image: 'images/ClassicMahjong.jpg' },
                // Add more games for low stress level as needed
            ],
            medium: [
                { name: 'Magic Tiles 3', url: 'https://www.silvergames.com/en/magic-tiles-3', image: 'images/magictiles3.png' },
                { name: 'Mahjong Cards', url: 'https://www.silvergames.com/en/mahjong-cards', image: 'images/mahjong.jpg' },
                // Add more games for medium stress level as needed
            ],
            high: [
                { name: 'Slime Simulator ASMR', url: 'https://www.silvergames.com/en/slime-simulator-asmr', image: 'images/slime.webp' },
                { name: 'Piano Tiles', url: 'https://www.silvergames.com/en/piano-tiles', image: 'images/piano.jpg' }
                // Add more games for high stress level as needed
            ]
        };

        return games[stressLevel];
    }

    // Function to display games
    function displayGames(games) {
        gamesContainer.innerHTML = '';
        games.forEach(game => {
            const card = document.createElement('div');
            card.classList.add('card');

            const content = document.createElement('div');
            content.classList.add('content2');

            const imgBx = document.createElement('div');
            imgBx.classList.add('imgBx');
            const img = document.createElement('img');
            img.src = game.image;
            img.alt = game.name;
            imgBx.appendChild(img);

            const contentBx = document.createElement('div');
            contentBx.classList.add('contentBx');
            const gameLink = document.createElement('a');
            gameLink.href = game.url;
            gameLink.textContent = game.name;
            contentBx.appendChild(gameLink);

            content.appendChild(imgBx);
            content.appendChild(contentBx);
            card.appendChild(content);

            gamesContainer.appendChild(card);
        });
    }

    // Event listener for stress level selection
    stressLevels.forEach(level => {
        level.addEventListener('click', function(event) {
            event.preventDefault();
            const stressLevel = this.id.replace('Stress', '').toLowerCase();
            const games = fetchGames(stressLevel);
            displayGames(games);
        });
    });
});