import express, { Request, Response } from 'express';
import { createContact, deleteContact, getContacts } from '../services/contact';

const router = express.Router();

router.post('/contato', async (req: Request, res: Response) => {
    const name = req.query.name as string;

    if (!name || name.length < 2) {
        return res.status(400).json({ error: 'O nome é obrigatório e deve ter mais de 2 caracteres.' });
    }

    await createContact(name);
    res.status(201).json({ contato: name });
});

router.delete('/contato', async (req: Request, res: Response) => {
    const name = req.query.name as string;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'O nome é obrigatório e deve ser uma string válida.' });
    }

    try {
        await deleteContact(name);
        res.json({ message: `Contato '${name}' deletado com sucesso.` });
    } catch (error: any) {
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Erro ao deletar o contato.' });
    }
});

export default router;