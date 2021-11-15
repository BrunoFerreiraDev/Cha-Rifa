import { query as q } from 'faunadb'
import { fauna } from '../../services/fauna'

export default async function cadastro(req, res) {
    const { body, method } = req
    const { numero, nome, indice } = body

    try {
        const confereIndice = await fauna.query(
            q.If(
                q.Not(
                    q.Exists(
                        q.Match(
                            q.Index('indice'),
                            q.Casefold(indice)
                        )
                    )
                ),
                q.Create(//inserção dentro do fauna
                    q.Collection('cadastro_pessoa'),//qual colection receberá os dados
                    { data: { numero, nome, indice } }//os dados
                ),
                q.Get(
                    q.Match(
                        q.Index('indice'),
                        q.Casefold(indice)
                    )

                )
            )
        ).then((ret) => ret)

        return res.status(200).send(confereIndice);

    } catch (err) {
        return err
    }
}
