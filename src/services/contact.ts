import exp from "constants";
import { existsSync, writeFileSync } from "fs";
import { readFile, writeFile } from "fs/promises";

const dataSource = './data/list.txt';

if (!existsSync(dataSource)) {
    writeFileSync(dataSource, '', 'utf-8');
}

export const getContacts = async () => {
    let list: string[] = [];
    try {
        const data = await readFile(dataSource, 'utf-8');
        list = data.split('\n').filter(item => item.trim() !== ''); // Remove linhas vazias
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Erro ao ler o arquivo: ${err.message}`);
        } else {
            console.error('Erro desconhecido ao ler o arquivo.');
        }
    }
    return list;
};

export const createContact = async (name: string) => {
    let list = await getContacts();
    list.push(name);
    await writeFile(dataSource, list.join('\n'));
}

export const deleteContact = async (name: string) => {
    let list = await getContacts();
    const initialLength = list.length;

    list = list.filter(item => item.toLowerCase() !== name.toLowerCase());

    if (list.length === initialLength) {
        throw new Error(`Contato '${name}' não encontrado.`);
    }

    await writeFile(dataSource, list.join('\n'));
};