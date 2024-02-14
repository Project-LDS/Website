var keyValue = document.getElementById('key');
var copyButton = document.getElementById('copyButton')

const likeVideo = document.getElementById('like-video')
const subscribeChannel = document.getElementById('subscribe-channel')
const getKey = document.getElementById('get-key')

const navbar = document.getElementById('navbar');
const mainContainer = document.getElementById('main-container');

let urlArray = []
let progress = []

const delay = ms => new Promise(res => setTimeout(res, ms));

function getCookie(cookieName) {
    var cookies = document.cookie;
    var key = cookieName + '=';
    var start = cookies.indexOf(key);

    if (start === -1) return null;

    var pos = start + key.length;
    var last = cookies.indexOf(';', pos);

    if (last !== -1) return cookies.substring(pos, last);

    return cookies.substring(pos);
}

fetch('./videos-data.json')
    .then(response => response.json())
    .then(data => {
        for (video in data) {
            const unlockProgress = document.getElementById('unlock-progress')

            urlArray.push(data[video].url)

            likeVideo.onclick = function () {
                const random = Math.floor(Math.random() * urlArray.length)
                window.open(urlArray[random]);

                if (!progress.includes('liked')) {
                    progress.push('liked');
                }

                setInterval(() => {
                    if (progress.length == 0) {
                        unlockProgress.textContent = 'unlock progress 0/2';
                    } else if (progress.length == 1) {
                        unlockProgress.textContent = 'unlock progress 1/2';
                    } else {
                        unlockProgress.textContent = 'unlock progress 2/2';
                        getKey.removeAttribute("disabled");
                    }
                }, 10000);
            }

            subscribeChannel.onclick = function () {
                window.open('https://www.youtube.com/@Sr_LDS?sub_confirmation=1')

                if (!progress.includes('sub')) {
                    progress.push('sub');
                }

                setInterval(() => {
                    if (progress.length == 0) {
                        unlockProgress.textContent = 'unlock progress 0/2';
                    } else if (progress.length == 1) {
                        unlockProgress.textContent = 'unlock progress 1/2';
                    } else {
                        unlockProgress.textContent = 'unlock progress 2/2';
                        getKey.removeAttribute("disabled");
                        getKey.style.backgroundColor = 'var(--purple)'
                    }
                }, 10000);
            }


            getKey.onclick = function () {
                const popUp = document.getElementById('pop-up');
                navbar.style.filter = 'opacity(1)';
                mainContainer.style.filter = 'opacity(1)';
                popUp.style.display = 'none';
                keyValue.textContent = getCookie('key');
            }
        };
    });

async function copyKey() {
    if (keyValue.textContent == '') {
        copyButton.textContent = 'Key not avaliable';
        copyButton.style.backgroundColor = '#ff3f3f';
        await delay(3000);
        copyButton.textContent = 'Copy Key';
        copyButton.style.backgroundColor = 'var(--purple)';
    }
    else {
        navigator.clipboard.writeText(keyValue.textContent);
        copyButton.textContent = 'Copied!';
        await delay(3000);
        copyButton.textContent = 'Copy Key';
    }
}

if (document.referrer.indexOf('linkvertise.com') == -1) {
    window.location.href = 'https://projectlds.online/';
}