const delay = ms => new Promise(res => setTimeout(res, ms));

fetch('./hub-code.json')
    .then(response => response.json())
    .then(data => {
        const hubCode = document.getElementById('hub-code')
        hubCode.textContent = data
    })

fetch('./supported-games.json')
    .then(response => response.json())
    .then(data => {
        const games = document.getElementById('games');

        for (var game in data) {
            const template = document.getElementById('template');
            const clone = template.content.cloneNode(true);

            const gameIcon = clone.getElementById('game-icon');
            const gameName = clone.getElementById('game-name');
            gameIcon.src = data[game].icon;
            gameName.textContent = data[game].name

            games.appendChild(clone);
        }
    })


async function copyScript() {
    const hubCode = document.getElementById('hub-code');
    const copyButton = document.getElementById('copy-script');

    if (hubCode.textContent == '') {
        copyButton.textContent = 'Code not avaliable';
        copyButton.style.backgroundColor = '#ff3f3f';
        await delay(3000);
        copyButton.textContent = 'Copy Key';
        copyButton.style.backgroundColor = 'var(--purple)';
    }
    else {
        navigator.clipboard.writeText(hubCode.textContent);
        copyButton.textContent = 'Copied!';
        await delay(3000);
        copyButton.textContent = 'Copy Key';
    }
}