const { Schema, model } = require("mongoose");


const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        defatul: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

categorySchema.methods.toJSON = function() {

    const { __v, _id, state, ...category } = this.toObject();
    category.uid = _id;

    return category;

}

module.exports = model('Category', categorySchema)