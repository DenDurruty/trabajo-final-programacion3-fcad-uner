import express from 'express';

import OficinasController from '../../controllers/oficinasController.js';

const router = express.Router();

const oficinasController = new OficinasController();

router.post('/agregar-empleados', oficinasController.agregarEmpleados);
// router.post('/quitar-empleados', oficinasController.quitarEmpleados);


export {router};