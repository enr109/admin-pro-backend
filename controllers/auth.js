const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleverify } = require('../helpers/google-verify');

const login = async( req, res = response ) => {

    const { email, password } = req.body;
    try {

        // Verificar email
        const usuariosDB = await Usuario.findOne({ email });

        if ( !usuariosDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuariosDB.password);

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
            
        }

        // Generar un token
        const token = await generarJWT( usuariosDB.id);


        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

}

const googleSignIn = async( req, res = response ) => {
    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleverify( googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar un token
        const token = await generarJWT( usuario.id);

        res.json({
            ok: true,
            msg: 'Google Signin',
            token
        });
        
    } catch (error) {
        res.status(401).json({
            ok: true,
            msg: 'Token no es correcto'
        });
    }

}

const renewToken = async(req, res = response) => {
    const uid = req.uid;

    // Generar un token
    const token = await generarJWT( uid );

    const usuarioDB = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuarioDB
    });
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}