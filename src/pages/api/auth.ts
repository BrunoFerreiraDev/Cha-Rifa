

export default async function auth(req, res) {
    const { body, method } = req
    const { login, senha } = body

    try {
        if (login == process.env.LOGIN && senha == process.env.SENHA) {
            return res.status(200).send(true);
        } else {
            return res.status(200).send(false);
        }

    } catch (err) {
        return err
    }
}
