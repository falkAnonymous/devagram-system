import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "../../types/RespostaPadraoMsg";
import type { CadastroUsuario } from "../../types/CadastroUsuario";
import { UsuarioModel } from '../../model/UsuarioModel'
import { conectarMongoDb } from '../../middlewares/conectarMongoDB'

const endpointCadastro =
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

        if (req.method === 'POST') {
            const usuario = req.body as CadastroUsuario;
            if (!usuario.Nome || usuario.Nome.length < 2) {
                return res.status(400).json({ erro: 'Nome pequeno demais ou invalido' })
            }

            if (!usuario.Senha || usuario.Senha.length < 8) {
                return res.status(400).json({ erro: 'Senha curta demais ou invalido' })
            }

            if (!usuario.Email || usuario.Email.length < 5 ||
                !usuario.Email.includes('@') || !usuario.Email.includes('.')
            ) {
                return res.status(400).json({ erro: 'Email pequeno demais ou invalido' })
            }
            await UsuarioModel.create(usuario);
            return res.status(200).json({ msg: 'Usuário cadastrado com sucesso' });
        }
        res.status(405).json({ erro: 'Método negado' })
    }

export default conectarMongoDb(endpointCadastro);