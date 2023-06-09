import chalk from "chalk";

function GetLinks(linksArr) {
    // arr.join() pega o conteúdo de um array e converte em uma string
    return linksArr.map((linkObject) => Object.values(linkObject).join());
}

async function CheckStatus(URLsList) {
    // Promise.all() pega uma lista de promessas pendentes e retorna uma lista de promessas resolvidas
    const arrStatus = await Promise.all(
        URLsList.map(async (url) => {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                // console.log(response);
                return response.status;
            } catch(error) {
                return HandleErrors(error);
            }
        })
    )
    // console.log(arrStatus);
    return arrStatus;
}

function HandleErrors(error) {
    if(error.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado.';
    } else {
        return 'Ocorreu algum erro';
    }
}

// Função sendo exportada para o arquivo cli.js
export default async function ReturnValidatedList(content) {
    const links = GetLinks(content);
    const status = await CheckStatus(links);
    // console.log(status);
    // console.log(content);

    const validatedLinksList = content.map((object, index) => {
        // console.log(status, typeof(status));
        // console.log(object);
        return ({
            ...object,
            status: status[index],
            message: status[index] === 200 ? "It's currently running!" : "Not found."
        })
    })

    return validatedLinksList;
}

// [gatinho salsicha](http://gatinhosalsicha.com.br/)