import { Router } from "express";
import { registerUsuario,login,usuarios,newInventario,editInvetario,allInventario, newVenta, editVenta, allVenta, actualizarCantidad, eliminar, sesion, buscarCliente, editGuiaEnvio, newGuiaEnvio} from "../controllers/controller.js";

const router = Router()



router.get('/', function (req, res) {
    const data = {
      message: 'Hola Mundo!'
    };
    res.json(data);
  });

router.post('/newUsuario',registerUsuario);

router.post('/login',login);

router.get('/usuarios',usuarios);

router.post('/newInventario',newInventario);

router.get('/inventario/:id',editInvetario);

router.get('/inventario',allInventario);

router.post('/newVenta',newVenta);

router.get('/venta/:id',editVenta);

router.get('/venta',allVenta)

router.post('/actualizarCantidad',actualizarCantidad)

router.delete('/eliminar',eliminar)

router.get('/sesion/:id',sesion)

router.get('/cliente/:id',buscarCliente)

router.get('/guiaEnvio/:id',editGuiaEnvio)

router.post('/newGuia',newGuiaEnvio)

export default router;