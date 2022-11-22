const { Schema, model } = require("mongoose");


const productSchema = Schema({
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
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }
})

productSchema.methods.toJSON = function() {

    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;

    return product;

}

module.exports = model('Product', productSchema)