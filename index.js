import fs from 'fs';
import chalk from 'chalk';

const text = "São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).";

function TreatError(error) {
    console.log(error);
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório.'));
}

// Código de leitura de arquivos em formato síncrono
function ReadFile(path) {
    const encoding = 'utf-8';
    // Função callback(erro, retorno)
    fs.readFile(path, encoding, (error, response) => { // O "_" é um padrão utilizado para que o JavaScript pule o parâmetro
        if (error) {
            TreatError(error);
        }
        console.log(chalk.green(response));
    })
}

// Código assíncrono usando .then e .catch
function ThenReadFile(path) {
    const encoding = 'utf-8';
    fs.promises.readFile(path, encoding)
        .then((response) => {
            const texto = response;
            console.log(chalk.green(texto));
        })
        .catch(TreatError);
}

// Código assíncrono usando async/await
async function AsyncAwaitReadFile(path) {
    try {
        const encoding = 'utf-8';
        const response = await fs.promises.readFile(path, encoding);
        console.log(GetLinksFromText(response));
        // console.log(chalk.green(response));
    }
    catch (error) {
        TreatError(error);
    }
    finally {
        console.log(chalk.yellow("Operação finalizada!"));
    }
}

function GetLinksFromText(text) {
    // Expressão regular para pegar tudo que está dentro dos colchetes
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const links = [...text.matchAll(regex)];
    const resultados = links.map(link => ({ [link[1]]: link[2] }))
    return resultados;
}

AsyncAwaitReadFile('./arquivos/texto.md');
// console.log(GetLinksFromText(text));