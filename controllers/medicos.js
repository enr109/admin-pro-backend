const { response } = require('express');
const Medicos = require('../models/medicos');

const getMedicos = async(req, res = response)=> {
    const medicos = await Medicos.find().populate('usuario','nombre').populate('hospital','nombre');
    res.json({
        ok: true,
        medicos
    })
}

const getMedicosByid = async(req, res = response)=> {

    const id = req.params.id;

    try {
        
        const medico = await Medicos.findById(id)
                                     .populate('usuario','nombre')
                                     .populate('hospital','nombre');
        res.json({
            ok: true,
            medico
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const crearMedico = async(req, res = response)=> {
    const uid = req.uid;
    console.log(uid);

    const medicos = new Medicos({
        usuario:uid,
        ...req.body
    });

    try {
        const medicosDB = await medicos.save();

        res.json({
            ok: true,
            medicos: medicosDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const actualizarMedico = async(req, res = response)=> {

    const id = req.params.id;

    const uid = req.uid;

    try {
        const medicos = await Medicos.findById( id );

        if ( !medicos ) {
            
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
            
        }

        const cambiarMedicos = {
            ...req.body,
            hospital: uid
        }

        const medicoActualizado = await Medicos.findByIdAndUpdate(id, cambiarMedicos, { new: true});

        res.json({
            ok: true,
            medicos: medicoActualizado
        })
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const borrarMedico = async(req, res = response)=> {
    const id = req.params.id;

    try {

        const medicos = await Medicos.findById( id );

        if ( !medicos ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
            
        }

        await Medicos.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicosByid
}