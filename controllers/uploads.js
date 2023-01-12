const path = require('path');
const fs = require('fs');

const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require("../helpers");
const { User, Product } = require('../models');

const uploadFiles = async(req = request, res = response) => {

    try {
        //files
        //const name = await uploadFile(req.files, ['txt', 'md'], 'texts');
        const name = await uploadFile(req.files, undefined, 'imgs');
        res.json({
            name
        });
    } catch (err) {
        res.status(400).json({ msg: err })
    }

}

const updateFile = async(req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `User no found with id ${id}`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Product no found with id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'forget validate this' })
    }

    //clean img 

    if (model.img) {

        const pathFile = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(pathFile)) {
            fs.unlinkSync(pathFile);
        }
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json({ model })
}

const updateFileCloudibary = async(req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `User no found with id ${id}`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Product no found with id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'forget validate this' })
    }

    //clean img 

    if (model.img) {
        const nameArr = model.img.split("/");
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    await model.save();

    res.json({ model })
}

const showFile = async(req, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `User no found with id ${id}`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Product no found with id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'forget validate this' })
    }

    //clean img 

    if (model.img) {

        const pathFile = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(pathFile)) {
            return res.sendFile(pathFile);
        }
    }

    const pathFileDefault = path.join(__dirname, '../assets', 'no-image.jpg');
    res.sendFile(pathFileDefault);
}

module.exports = {
    uploadFiles,
    updateFile,
    updateFileCloudibary,
    showFile
}