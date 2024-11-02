import type { NextApiRequest, NextApiResponse } from 'next';
import { conectarMongoDb } from '../../middlewares/conectarMongoDB';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import { json } from 'stream/consumers'

const endpointLogin = (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
    if (req.method === 'POST') {
        const { login, senha } = req.body;
        if (login === 'admin@2024' && senha === 'admin@2025') {

            res.status(200).json({ msg: 'Autenticado com sucesso' })

        }
        res.status(400).json({ erro: 'Login e Senha Invalido ou não encontrado' })
    }
    return res.status(405).json({ erro: 'Método Invalido' })
}
export default conectarMongoDb(endpointLogin);