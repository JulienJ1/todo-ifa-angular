export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongo: {
        uri: `mongodb+srv://${process.env.LOGIN}:${process.env.MDP}@cluster0.ziieh.mongodb.net/${process.env.DB_NAME}?authSource=admin&replicaSet=atlas-n6znio-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,
    },
    tokenSecret: {
        access: process.env.ACCESS_TOKEN
    }
});
