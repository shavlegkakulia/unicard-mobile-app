const devEnvs = {
    API_URL: 'https://api.unicard.ge/',
    client_id: 'unicardApi',
    client_secret: 'secret'
}

const prodEnvs = {
    API_URL: 'https://api.unicard.ge/',
    client_id: 'unicardApi',
    client_secret: 'secret'
}

export default __DEV__ ? devEnvs : prodEnvs;