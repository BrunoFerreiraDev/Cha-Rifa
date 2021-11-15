import { query as q } from 'faunadb'
import { fauna } from '../../services/fauna'

export default async function consultar(req, res) {
    const { body, method } = req
    const { numero, nome, indice } = body

    try {
        const confereIndice = await fauna.query(

            q.Get(q.Match(q.Index('indice'), q.Casefold(0)))

        ).then((ret) => ret)
            .catch((err) => console.error('Error: %s', err))

        return res.status(200).send(confereIndice);
    } catch (err) {
        return err
    }
}