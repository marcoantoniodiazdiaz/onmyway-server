import { Usuario } from './usuario';


export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() { }

    // Agregar un usuario
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log('🟢  Cliente conectado')
        return usuario
    }

    public actualizarNombre(id: string, nombre: string, database: string, tipo: string, token: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                usuario.database = database;
                usuario.tipo = tipo;
                usuario.token = token;
                break;
            }
        }
    }

    // Obtener lista de usuarios
    public getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    // Obtener un usuario
    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener usuario en una sala en particular
    public getUsuariosEnSala(tipo: string) {
        return this.lista.filter(usuario => usuario.tipo === tipo);
    }

    // Borrar Usuario
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }

    public actualizaPosicion(id: string, lat: number, lon: number, database: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.lat = lat;
                usuario.lon = lon;
                usuario.database = database;
                break;
            }
        }
    }

    public cambiarCoche(id: string, coche: object) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.coche = coche;
                break;
            }
        }
    }

    public configurarEmision(id: string, emitiendo: boolean, tipo: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.emitiendo = emitiendo;
                if (tipo) {
                    usuario.tipo = tipo;
                }
                break;
            }
        }
    }

    public verIdDeSocket(database: string) {
        for (let usuario of this.lista) {
            if (usuario.database === database) {
                return usuario.id
            }
        }
    }

    public verIdLista(database: string) {

        const ids = [];

        for (let usuario of this.lista) {
            if (usuario.database === database) {
                ids.push(usuario.id);
            }
        }

        return ids;
    }
}