import mongoose from "../database/conexion.js";



const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const usuario = mongoose.model('usuario', usuarioSchema);


const inventarioSchema = new Schema ({
 nombreProducto : {type:String},
 cantidad : Number,
 precio: Number,
 disponible: Number,
 color:String,
 talla:String,
 margen:Number,
 precioUnitario:Number,
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now }
})

export const inventario = mongoose.model('inventario',inventarioSchema)


const ventaSchema = new Schema ({
  nombreCliente : String,
  apellidoCliente : String,
  documento : Number,
  indicativo: Number,
  celular: Number,
  direccion: String,
  correo:String,
  idDepartamento: Number,
  departamento: String,
  ciudad: String,
  barrio: String,
  formapago:String,
  producto: [
    {
      _id : {type:String},
      disponible:{type:Number},
      nombreProducto:{type:String},
      precioUnitario:{type:Number},
      precioTotal:{type:Number},
    }
  ],
 tipoPedido: String,
 total:Number,
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now }
})

export const venta = mongoose.model('ventas',ventaSchema)

const guiaEnvioSchema = new Schema ({
  nombreCliente : String,
  apellidoCliente : String,
  documentoCliente : Number,
  celularCliente: Number,
  direccionCliente: String,
  ciudadCliente: String,
  barrioCliente: String,
  nombreRemitente : String,
  apellidoRemitente : String,
  documentoRemitente : Number,
  celularRemitente: Number,
  direccionRemitente: String,
  ciudadRemitente: String,
  barrioRemitente: String,
  fechallegada:Date,
  idventa: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const guiaEnvio = mongoose.model('guiaEnvios',guiaEnvioSchema)