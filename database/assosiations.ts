import { Usuarios } from '../models/usuarios.model';
import { Viajes } from '../models/viajes.model';
import { Vehiculos } from '../models/vehiculos.model';
import { Archivos } from '../models/archivos.model';
import { Contactos } from '../models/contacto.model';
import { Marcas } from '../models/marcas.model';
import { Calificaciones } from '../models/calificaciones.model';
import { Transactions } from '../models/transactions.model';



export const createAssosiations = () => {

    Usuarios.hasMany(Viajes, { as: 'usuario', foreignKey: 'usuarioId' });
    Usuarios.hasMany(Viajes, { as: 'conductor', foreignKey: 'conductorId' });
    Viajes.belongsTo(Usuarios);

    Vehiculos.hasMany(Viajes, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    Viajes.belongsTo(Vehiculos, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

    Usuarios.hasMany(Archivos, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    Archivos.belongsTo(Usuarios, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

    Usuarios.hasMany(Contactos, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    Contactos.belongsTo(Usuarios, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

    Usuarios.hasMany(Vehiculos, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    Vehiculos.belongsTo(Usuarios, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

    Marcas.hasMany(Vehiculos, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    Vehiculos.belongsTo(Marcas, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

    Usuarios.hasMany(Calificaciones, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    Calificaciones.belongsTo(Usuarios, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

    Usuarios.hasMany(Transactions, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    Transactions.belongsTo(Usuarios, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

}

