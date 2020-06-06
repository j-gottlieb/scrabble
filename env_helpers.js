const isProduction = () => process.env.NODE_ENV === 'production';

const getEnvVar = key => process.env[key];

module.exports = {
    isProduction,
    getEnvVar
}
