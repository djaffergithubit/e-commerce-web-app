const mongoose = require('mongoose')

const Connect = async()=>{
    mongoose.connect(process.env.MONGO_URL)
    const connection = await mongoose.connection

    connection.on('connected', ()=>{
        console.log('mongoose connected')
    })

    connection.on('error', (err)=>{
        console.log(err)
    })
}

module.exports = Connect