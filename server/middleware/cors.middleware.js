import cors from 'cors'

export default () => cors({ origin: ["http://localhost:3000", process.env.CORS_ORIGIN] })