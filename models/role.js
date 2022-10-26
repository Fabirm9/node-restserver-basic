const { Schema, model } = require("mongoose");


const roleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Rol is required']
    }
})

module.exports = model('Role', roleSchema)