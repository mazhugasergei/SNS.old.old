import Password from '../models/Password.js'

const password_get = async (req, res) => {
  await Password.findOne({ author_id: req.params.author_id })
    .then(result => res.json({ access: req.query.password === result.password ? true : false }))
    .catch(err => res.status(400).json({ message: err.message }))
}

export default {
  password_get
}