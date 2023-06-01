import fs from 'fs';
import chalk from 'chalk';

// Código de leitura de arquivos em formato síncrono
// function SyncReadFile(path) {
//     const encoding = 'utf-8';
//     // Função callback(erro, retorno)
//     fs.readFile(path, encoding, (error, response) => { // O "_" é um padrão utilizado para que o JavaScript pule o parâmetro
//         if (error) {
//             TreatError(error);
//         }
//         console.log(chalk.green(response));
//     })
// }

// Código assíncrono usando .then e .catch
// function AsyncReadFile(path) {
//     const encoding = 'utf-8';
//     fs.promises.readFile(path, encoding)
//         .then((response) => {
//             const texto = response;
//             console.log(chalk.green(texto));
//         })
//         .catch(TreatError);
// }

// Código para tratamento de erro
function TreatError(error) {
    console.log(error);
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório.'));
}

// Extrai links, seguindo o padrão do texto, por meio de uma expressão regular
function GetLinksFromText(text) {
    // Expressão regular para pegar tudo que está dentro dos colchetes
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const links = [...text.matchAll(regex)];
    const resultados = links.map(link => ({ [link[1]]: link[2] }))
    return resultados.length > 0 ? resultados : 'Não há links no arquivo.';
}

// Código assíncrono usando async/await
async function ReadFile(path) {
    try {
        const encoding = 'utf-8';
        const response = await fs.promises.readFile(path, encoding);
        return GetLinksFromText(response);
    }
    catch (error) {
        TreatError(error);
    }
    // Finally executa sempre ao final da execução do try catch, independente do resultado encontrado
    // finally {
    //     console.log(chalk.yellow("Operação finalizada!"));
    // }
}

export default ReadFile;