import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import mongoose from 'mongoose';
import { error } from 'console';
import { RespostaPadraoMsg } from '../types/RespostaPadraoMsg';

export const conectarMongoDb = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
        // Verifica se  o banco esta conectado, se estiver segue  para o endpoint
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
        // Conectar ao banco
        //Obter a variavel de ambiente preenchinda no 'env'
        const { Conexao_DBMongo } = process.env;
        // se env estiver vazia abortar o uso do sistema e avisar o programador
        if (!Conexao_DBMongo) {
            return res.status(500).json({ erro: "Env não informado para a conexão" });
        }
        mongoose.connection.on('connected', () => console.log('Banco conectado com sucesso'));
        mongoose.connection.on('error', error => console.log('Erro ao conectar ao banco de dados ${error}'));
        await mongoose.connect(Conexao_DBMongo);
        // Finalizad0 vamos seguindo em frente
        return handler(req,res);

    }