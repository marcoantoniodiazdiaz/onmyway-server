import { Usuarios } from '../models/usuarios.model';
import { Viajes } from '../models/viajes.model';
import { Vehiculos } from '../models/vehiculos.model';
import { Archivos } from '../models/archivos.model';
import { Contactos } from '../models/contacto.model';
import { Marcas } from '../models/marcas.model';



export const createAssosiations = () => {

    Usuarios.hasMany(Viajes);
    Viajes.belongsTo(Usuarios);

    Vehiculos.hasMany(Viajes);
    Viajes.belongsTo(Vehiculos);

    Usuarios.hasMany(Archivos);
    Archivos.belongsTo(Usuarios);

    Usuarios.hasMany(Contactos);
    Contactos.belongsTo(Usuarios);

    Usuarios.hasMany(Vehiculos);
    Vehiculos.belongsTo(Usuarios);

    Marcas.hasMany(Vehiculos);
    Vehiculos.belongsTo(Marcas);

    // Usuarios y Heroes
    // Users.hasMany(Heroes, { as: 'heroeOf', foreignKey: 'heroeOfId' });
    // Users.hasMany(Heroes, { as: 'userHero', foreignKey: 'userHeroId' });

    // Requests.hasMany(Payments);
    // Payments.belongsTo(Requests);

}

