require('dotenv').config()

const buildEnvConfig = (acc, cur) => ({ ...acc, [`process.env.${cur}`]: process.env[cur] })
const env = ['BASE_API_URL'].reduce(buildEnvConfig, {})

module.exports = env
