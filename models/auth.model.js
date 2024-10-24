const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { resolve } = require('path');
const { rejects } = require('assert');

const schemaAuth = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('user', schemaAuth);
const url = "mongodb://localhost:27017/library";

exports.registerFunctionModel = (name, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.findOne({ email: email });
        }).then((existingUser) => {
            if (existingUser) {
                mongoose.disconnect();
                reject('Email is already in use');
            } else {
                return bcrypt.hash(password, 10);
            }
        }).then((hashedPassword) => {
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword
            });
            return newUser.save();
        }).then(() => {
            mongoose.disconnect();
            resolve('Registered successfully!');
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.LoginFunctionModel = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    bcrypt.compare(password, user.password)
                        .then((verif) => {
                            if (verif) {
                                resolve(user._id); // Si le mot de passe est correct, on résout avec l'ID de l'utilisateur
                            } else {
                                reject('Invalid password'); // Mot de passe incorrect
                            }
                        });
                } else {
                    reject('User not found'); // Utilisateur non trouvé dans la base de données
                }
            })
            .catch((err) => {
                reject(err); // Gestion des erreurs
            });
    });
};
