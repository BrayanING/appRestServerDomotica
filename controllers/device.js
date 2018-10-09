var express = require('express');
var model = require('../orm/orm').model;
var device = model.Device;
var app = express();
var bcrypt = require('bcrypt');
const _ = require('underscore');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

create = (req, res) => {
    let body = req.body;
    let deviceSave = {};
    deviceSave = {
        name: body.name,
        description: body.description,
        status: 1
    };
    device
        .create(deviceSave)
        .then((device) => {
            res.status(200).json({
                ok: true,
                device
            });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err
            });
        });
};

listAll = (req, res) => {
    device.findAll({
            where: {
                status: true
            }
        })
        .then((devices) => {
            res.status(200).json({
                ok: true,
                devices
            });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
        });
};

collectionDevice = (req, res) => {
    var name = req.params.name;
    device.findAll({
            where: {
                status: true,
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        .then((devices) => {
            res.status(200).json({
                ok: true,
                devices
            });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
        });
};

update = (req, res) => {
    let body = req.body;
    let deviceId = req.params.id;
    let updateDevice = {};
    updateDevice = _.pick(req.body, ['name', 'description']);

    device
        .findById(deviceId)
        .then((device) => {
            device
                .update(updateDevice)
                .then((device) => {
                    res.status(200).json({
                        ok: true,
                        devices: device
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err
            });
        });
};

updateStatus = (req, res) => {
    let deviceId = req.params.id;
    let updateDevice = {};
    updateDevice = {
        status: false
    };

    device
        .findById(deviceId)
        .then((device) => {
            if (device.status === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El dato no existe'
                    }
                });
            }

            device
                .update(updateDevice)
                .then((device) => {
                    res.status(200).json({
                        ok: true,
                        device
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err
            });
        });
};


module.exports = {
    create,
    listAll,
    collectionDevice,
    update,
    updateStatus
}