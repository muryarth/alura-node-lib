import chalk from 'chalk';
import fs from 'fs';
import ReadFile from "./index.js";
import ReturnValidatedList from "./http-validation.js";

const path = process.argv;
// console.log("process.argv parameters: ", path);

async function PrintContent(validate = false, result, identifier = '') {
    if (validate) {
        console.log(
            chalk.yellow('Lista validada em'),
            chalk.black.bgBlue(identifier),
            await ReturnValidatedList(result));
    } else {
        console.log(`${chalk.yellow('Lista de links: ')}${chalk.black.bgBlue(identifier)}\n`, result);
    }
}

async function ProcessTextContent(args) {
    const path = args[2];
    const validate = (args[3] === '--validate');

    try {
        fs.lstatSync(path);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red("Não há arquivo no diretório."));
            return;
        }
    }

    // Identifica se é um arquivo
    if (fs.lstatSync(path).isFile()) {
        const content = await ReadFile(path);
        PrintContent(validate, content, `./${path}`);
    }

    // Identifica se é um diretório, e analisa os arquivos dentro do diretório fornecido
    else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        console.log('Files: ', files);
        files.forEach(async (file) => {
            const content = await ReadFile(`./${path}/${file}`);
            PrintContent(validate, content, `./${path}/${file}`);
        })
    }
}

ProcessTextContent(path);

// Testando assincronicidade do código
// console.log('Disparou essa linha de código!');