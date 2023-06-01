import chalk from 'chalk';
import fs from 'fs';
import ReadFile from "./index.js";

const path = process.argv;

function PrintContent(result) {
    console.log(chalk.yellow('Lista de links: '), result);
}

async function ProcessText(args) {
    const path = args[2];

    // Identifica se é um arquivo
    if (fs.lstatSync(path).isFile()) {
        const content = await ReadFile(path);
        console.log(content);
        PrintContent(content);
    }
    // Identifica se é um diretório, e analisa os arquivos dentro do diretório fornecido
    else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        console.log('Files: ', files);
        files.forEach(async (file) => {
            const content = await ReadFile(`./${path}/${file}`);
            console.log(chalk.blue(`./${path}/${file}`));
            PrintContent(content);
        })
    }
}

ProcessText(path);

// Testando assincronicidade do código
console.log('Disparou essa linha de código!');