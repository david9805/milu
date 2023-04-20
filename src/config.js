import {config} from 'dotenv'
config();

console.log(process.env.nick)

export default {
    port: process.env.PORT || 3004
}