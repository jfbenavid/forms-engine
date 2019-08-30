require('dotenv').config()

const buildEnvConfig = (acc, cur) => ({ ...acc, [`process.env.${cur}`]: process.env[cur] })
const env = ['BASE_URL'].reduce(buildEnvConfig, {})

module.exports = env
