import Password from '../models/Password.js'

const password_get = async (req, res) => {
  await Password.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(400).json({ message: err.message }))
}

export default {
  password_get
}