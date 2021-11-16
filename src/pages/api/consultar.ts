import { query as q } from 'faunadb'
import { fauna } from '../../services/fauna'

export default async function consultar(req, res) {
    const { body, method } = req
    const { numero, nome, indice } = body

    try {
        const confereIndice = await fauna.query(

            q.Map(
                q.Paginate(q.Documents(q.Collection('cadastro_pessoa'))),
                q.Lambda(x => q.Get(x))
            )

        ).then((ret) => ret)
            .catch((err) => console.error('Error: %s', err))

        return res.status(200).send(confereIndice);
    } catch (err) {
        return err
    }
}