import server from './server'
import dotenv from 'dotenv'
import http from 'http'
import mongoose from 'mongoose'
dotenv.config()

if (process.env.NODE_ENV == 'production') {
    console.log('comming soon')
} else {
    const app = http.createServer(server)
    app.listen(process.env.PORT)
    app.on('listening', connected)
}


function connected() {
    console.log('Server connected')
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then((res) => {
        console.log('Database connected')
    }).catch(error => {
        console.log('Database not conneted')
    })
}

// app.listen(3000, ()=> {
//     console.log('API is started and listening on port 3000')
// })

// export default app