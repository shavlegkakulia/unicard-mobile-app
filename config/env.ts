const devEnvs = {
    CONNECT_URL: '/'
}

const prodEnvs = {
    CONNECT_URL: '/'
}

export default __DEV__ ? devEnvs : prodEnvs;