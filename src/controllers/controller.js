import mongoose from '../database/conexion.js';
import bcrypt from 'bcryptjs';
import {usuario,inventario,venta,guiaEnvio} from '../models/model.js';


const encrypt = async(text) => {
    const hash = await bcrypt.hash(text,10)
    return hash
}

const compare = async(password,hash) => {
    const res = await bcrypt.compare(password,hash)
    console.log(res)
    return res
}


export const registerUsuario = async(req,res) => {
    try
    {
        const {username,password} = req.body 
        const hash = await encrypt(password)
        console.log(hash)

        const usu = usuario.findOne({username:username}).then((doc) => {
            if (doc === null) {
                const nuevoUsuario = new usuario({
                    username: username,
                    password: hash
                  });
                  
        
                  try {
                    const user = nuevoUsuario.save();
                  } catch (err) {
                    console.error(err);
                  }
        
                res.json(nuevoUsuario)
            }
            else
            {

                const result = bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                      console.log(err);
                    } else {
                      // Actualizamos la contraseña en la base de datos
                      doc.password = hash;
                      doc.updatedAt =  new Date();
                      doc.save()
                     .then(updatedUser => {
                        console.log('Contraseña Actualizada');
                        res.json(updatedUser)
                        
                     })
                     .catch(err => {
                        console.log(err);
                     });

                    }

                    
                  });
                
              
               
               
            }
          })
          .catch((err) => {
            console.log('2',err);
          });

                
    }
    catch (error)
    {
        res.status(404);
        res.json(error.message)
    }
}


export const login = async(req,res) => {
    try
    {
        const {username,password} = req.body 
        console.log(username,password)
        const user = await usuario.findOne({username:username});
        console.log(user)
        if (!user){
            res.json(user)
        }
        else {
            console.log(password,user.password)
            const checkPassword = await compare(password,user.password)

            if (checkPassword){
                res.json(user)
            }
            else
            {
                res.json(null)
            }
        }        
    }
    catch (error)
    {
        res.status(404);
        return res.json(error.message)
    }
}

export const sesion = async (req,res) => {

    const {id} = req.params
    try {
        const user = await usuario.findOne({_id:id})

        if (user) {
            res.json(user)
        }else {
            res.json(null)
        }
    }catch (error) {
        res.json(null)
    }
}

export const usuarios = async (req,res) => {

    const user = await usuario.find();

    res.json(user)
}

export const newInventario = async (req,res) => {

    try
    {
        const {nombreProducto,cantidad,precio,disponible,color,talla,margen,precioUnitario,_id} = req.body

        if (_id === '') {

            const nuevoInventario = new inventario({
                nombreProducto:nombreProducto,
                cantidad:cantidad,
                precio:precio,
                disponible:disponible,
                color:color,
                talla:talla,
                margen:margen,
                precioUnitario:precioUnitario
            })

            nuevoInventario.save()
            .then(result => {
                res.json(result);
            })
            .catch(error => {
                return res.json('error crear');
            });       
        }
        else
        {
            console.log(_id)
            await inventario.findOne({_id:_id}).then((doc)=> {
                
                
                if (doc === null){
                    
    
                    
                } else {
                    console.log('updates')
                    doc.nombreProducto = nombreProducto
                    doc.cantidad = cantidad
                    doc.precio = precio
                    doc.disponible = disponible
                    doc.color=color
                    doc.talla=talla
                    doc.margen=margen
                    doc.precioUnitario=precioUnitario
                    doc.updatedAt = new Date()
                    doc.save()
                         .then(updateInventario => {
                            console.log('Inventario Actualizado');
                            res.json(updateInventario)
                            
                         })
                         .catch(err => {
                            res.json('error actualiza');
                         });
                }
            })
            console.log('no null')
        }
          

    }
    catch (error)
    {
        res.json(error)
    }
}

export const editInvetario = async (req,res) => {
    try {
        const {id} = req.params
        const inve = await inventario.findOne({_id:id})
        res.json(inve)
    } catch (error){
        res.status(404)
        res.json(error.message)    
    }    
}

export const allInventario = async (req,res) => {
    const inve = await inventario.find()

    res.json(inve)
}

export const actualizarCantidad = async (req,res)=>{
    const data = req.body;
    let count = 0; // variable de recuento

    data.forEach(element => {
    inventario.findOne({_id:element._id}).then((doc)=> {
        if (doc === null){
        // hacer algo si el documento no se encuentra
        } else {
            doc.disponible = element.disponible;
            doc.updatedAt = new Date();
            doc.save()
            .then(updateInventario => {
            })
        }
    });                
  });

  res.json('Actualizado')
}

export const newVenta = async (req,res) =>{
    try {
        const data = req.body
        
        const ventasData = data
        const _id = ventasData._id

        if (_id === '') {

            const nuevaVenta = new venta({
                nombreCliente : ventasData.nombreCliente,
                apellidoCliente : ventasData.apellidoCliente,
                documento : ventasData.documento,
                indicativo : ventasData.indicativo,
                celular : ventasData.celular,
                direccion : ventasData.direccion,
                idDepartamento: ventasData.idDepartamento,
                departamento: ventasData.departamento,
                ciudad: ventasData.ciudad,
                barrio: ventasData.barrio,
                formapago : ventasData.formapago,
                producto: ventasData.producto.map(p => ({
                    _id: p._id,
                    disponible: p.disponible,
                    nombreProducto: p.nombreProducto,
                    precioUnitario: p.precioUnitario
                })),
                tipoPedido : ventasData.tipoPedido,
                total : ventasData.total
            })

            nuevaVenta.save()
            .then(result => {
                res.json(result);
            })
            .catch(error => {
                return res.json(error);
            }); 
        }else {
            console.log('Edit')
                await venta.findOne({_id:_id}).then((doc)=> {
                console.log(doc)
                if (doc){

                    doc.nombreCliente = ventasData.nombreCliente
                    doc.apellidoCliente = ventasData.apellidoCliente
                    doc.documento = ventasData.documento
                    doc.indicativo = ventasData.indicativo
                    doc.celular = ventasData.celular
                    doc.direccion = ventasData.direccion
                    doc.formapago = ventasData.formapago
                    doc.producto= ventasData.producto.map(p => ({
                        _id: p._id,
                        disponible: p.disponible,
                        nombreProducto: p.nombreProducto,
                        precioUnitario: p.precioUnitario
                    }))
                    doc.origen = ventasData.origen
                    doc.total = ventasData.total
                    doc.updatedAt = new Date()

                    doc.save().then(updateVenta => {
                        res.json(updateVenta)
                    })
                }
            })                
            }
        }catch (error){
            res.json(error.message)
        }
}
export const newGuiaEnvio = async (req,res) =>{
    
    try {    

        const {nombreCliente,apellidoCliente,documentoCliente,celularCliente,direccionCliente,ciudadCliente,barrioCliente,nombreRemitente,apellidoRemitente,documentoRemitente,celularRemitente,direccionRemitente,ciudadRemitente,barrioRemitente,idventa,fechallegada,_id} = req.body

        console.log(nombreCliente)
        if (_id === '') {
            const nuevaGuiaEnvio = new guiaEnvio({
                nombreCliente:nombreCliente,
                apellidoCliente:apellidoCliente,
                documentoCliente:documentoCliente,
                celularCliente:celularCliente,
                direccionCliente:direccionCliente,
                ciudadCliente:ciudadCliente,
                barrioCliente:barrioCliente,
                nombreRemitente:nombreRemitente,
                apellidoRemitente:apellidoRemitente,
                documentoRemitente:documentoRemitente,
                celularRemitente:celularRemitente,
                direccionRemitente:direccionRemitente,
                ciudadRemitente:ciudadRemitente,
                barrioRemitente:barrioRemitente,
                idventa:idventa,
                fechallegada:fechallegada
            }) 

            nuevaGuiaEnvio.save()
            .then(result=> {
                res.json(result)
            }).catch(result =>{
                return res.json(result)
            })
        }
        else {
            await guiaEnvio.findOne({_id:_id}).then((doc)=>{
                if (doc) {
                    doc.nombreCliente=nombreCliente,
                    doc.apellidoCliente=apellidoCliente,
                    doc.documentoCliente=documentoCliente,
                    doc.celularCliente=celularCliente,
                    doc.direccionCliente=direccionCliente,
                    doc.ciudadCliente=ciudadCliente,
                    doc.barrioCliente=barrioCliente,
                    doc.nombreRemitente=nombreRemitente,
                    doc.apellidoRemitente=apellidoRemitente,
                    doc.documentoRemitente=documentoRemitente,
                    doc.celularRemitente=celularRemitente,
                    doc.direccionRemitente=direccionRemitente,
                    doc.ciudadRemitente=ciudadRemitente,
                    doc.barrioRemitente=barrioRemitente,
                    doc.fechallegada=fechallegada,
                    doc.updatedAt = new Date()

                    doc.save().then(updateGuiaEnvio =>{
                        res.json(updateGuiaEnvio)
                    }).catch(error => {
                        return res.json(error)
                    })
                }
            })
        }
    }catch (error){
        return res.json(error)
    }
}

export const editGuiaEnvio = async(req,res) => {
    try {
        const {id} = req.params

        const guia = await guiaEnvio.findOne({_id:id}).then()

        res.json(guia)
    }catch (error) {
        res.json(erorr)
    }
}

export const editVenta = async (req,res) => {
    try {
        const {id} = req.params

        const vent = await venta.findOne({_id:id}).then()

        
        
        const vent2 = await venta.findOne({_id: id})
        .populate('producto', 'nombreProducto cantidad')
        .exec()

        res.json(vent2)

    } catch (error){
        res.json(error.message)
    }
}

export const allVenta = async (req,res) => {

    const vent = await venta.find()

    res.json(vent)
}

export const eliminar = async(req,res) => {
   venta.deleteMany({})   
  .then(() => {
    console.log('Todos los documentos fueron eliminados de la colección miColeccion');
  })
  .catch(error => {
    console.error('Error al eliminar documentos de la colección miColeccion:', error);
  });


  inventario.deleteMany({})   
  .then(() => {
    console.log('Todos los documentos fueron eliminados de la colección miColeccion');
  })
  .catch(error => {
    console.error('Error al eliminar documentos de la colección miColeccion:', error);
  });


  res.json('todo elimnado');

}

export const buscarCliente = async (req,res) => {
    const {id} = req.params
    console.log(id)
    try {
        const cliente = await  venta.findOne({documento:id});
        res.json(cliente)
    }catch (error) {
        return res.json(null)
    }
}