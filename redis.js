const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config()

const clientRedis = () => {
    return redis.createClient({url : process.env.redis_url}
        
    )

}

const client = clientRedis()

client.on("error", (err) => {
    console.log(err)
}
)
client.on("connect", () => {
    console.log("Redis connected")
}
)
client.on("end", () => {
    console.log("Redis connection ended")
}
)
client.on("SIGQUIT", () => {
    client.quit()
}
)


module.exports = client;