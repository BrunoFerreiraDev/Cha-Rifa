import { query as q } from 'faunadb'
import { fauna } from '../../services/fauna'

export default async function consultar(req, res) {
    const { body, method } = req
    const { ref } = body

    try {
        const confereIndice = await fauna.query(
            // cadastro_pessoa
            q.Delete(q.Ref(q.Collection('cadastro_pessoa'), `${ref}`))
        ).then((ret) => ret)
            .catch((err) => console.error('Error: %s', err))

        return res.status(200).send(confereIndice);
    } catch (err) {
        return err
    }
}