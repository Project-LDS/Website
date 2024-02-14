function createCookie(newKey) {
	if (!document.cookie) {
		const cookieString = 'key=' + newKey + ';max-age=86400;path=/';
		document.cookie = cookieString;
	}
}

function generateKey() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let key = '';

	for (let i = 0; i < 12; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		key += characters.charAt(randomIndex);
	}

	return key;
}

createCookie(generateKey());