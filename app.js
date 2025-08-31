let words = ['meghívó', 'fogadás', 'tánc', 'étel', 'zene'];
        const displayElement = document.getElementById('raffle-display');
        const drawButton = document.getElementById('draw-button');
        const wordsListElement = document.getElementById('words-list');
        let isDrawing = false;
        function updateRemainingWords() {
            wordsListElement.innerHTML = '';
            if (words.length === 0) {
                const li = document.createElement('li');
                li.textContent = 'Nincs több szó.';
                wordsListElement.appendChild(li);
            } else {
                words.forEach(word => {
                    const li = document.createElement('li');
                    li.textContent = word;
                    wordsListElement.appendChild(li);
                });
            }
        }

        function drawWord() {
            if (isDrawing) return;
            
            if (words.length === 0) {
                displayElement.textContent = 'Vége!';
                drawButton.disabled = true;
                drawButton.textContent = 'Vége!';
                return;
            }

            isDrawing = true;
            drawButton.disabled = true; // Letiltjuk a gombot
            displayElement.classList.remove('winner'); // Eltávolítjuk a nyertes stílust
            displayElement.classList.add('spinning'); // Hozzáadjuk a pörgő stílust
            
            const spinInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * words.length);
                displayElement.textContent = words[randomIndex];
            }, 200);

            setTimeout(() => {
                clearInterval(spinInterval); // Leállítjuk a pörgést
                const winnerIndex = Math.floor(Math.random() * words.length);
                const winner = words[winnerIndex];
                words.splice(winnerIndex, 1);
                displayElement.textContent = winner;
                displayElement.classList.remove('spinning');
                displayElement.classList.add('winner');
                updateRemainingWords();
                isDrawing = false;
                if (words.length > 1) {
                    drawButton.disabled = false;
                } else {
                    drawButton.textContent = 'Vége!';
                    drawButton.disabled = true;
                }

            }, 3000);
        }
        drawButton.addEventListener('click', drawWord);
        updateRemainingWords();