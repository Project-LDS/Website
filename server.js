import express from 'express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import pkg from 'jsonfile';
const { readFile, writeFile } = pkg;
import fs from 'fs';
import * as cron from 'node-cron';

const getCurrentDirname = (importMetaUrl) => {
    const __filename = fileURLToPath(importMetaUrl);
    return dirname(__filename);
};
const __dirname = getCurrentDirname(import.meta.url);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.get('/hub', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'hub.html'));
});

app.get('/scripts', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'scripts.html'));
});

app.get('/key', (req, res) => {
    const key = req.cookies.key;

    res.sendFile(join(__dirname, 'public', 'key.html'));

    if (key) {
        readFile('./api.json', (err, jsonData) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
            } else {
                if (jsonData.includes(key)) {
                    console.log(`O valor "${key}" já existe no arquivo.`);
                } else {
                    jsonData.push(key);

                    writeFile('./api.json', jsonData, { spaces: 2 }, (writeErr) => {
                        if (writeErr) {
                            console.error('Erro ao escrever no arquivo:', writeErr);
                        } else {
                            console.log(`Valor "${key}" adicionado com sucesso ao arquivo.`);
                        }
                    });
                }
            }
        });
    }
});

app.get('/api', (req, res) => {
  res.status(200).send({
    message: 'No API key was included in the request.'
  });
});

app.get('/api/:id', (req, res) => {
	if (req.params.id == 'keys') {
		res.sendFile(join(__dirname, 'api.json'));
	} else {
		res.status(200).send({
			message: 'invalid API key.'
		  });
	}
});

app.listen(PORT, (error) => {
    if (error) console.log(error);
    console.log(`Server running on port ${PORT}`);
});

function resetJsonData() {
    fs.writeFileSync('./api.json', JSON.stringify([], null, 2));

    console.log('Arquivo JSON resetado.');
}

cron.schedule('0 0 0 * * *', () => {
    resetJsonData();
});
