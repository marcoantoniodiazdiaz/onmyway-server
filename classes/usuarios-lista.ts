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

    public actualizarNombre(id: string, nombre: string, idDatabase: string, tipo: string, nToken: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                usuario.idDatabase = idDatabase;
                usuario.tipo = tipo;
                usuario.nToken = nToken;
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

    public actualizaPosicion(id: string, lat: number, lon: number, idDatabase: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.lat = lat;
                usuario.lon = lon;
                usuario.idDatabase = idDatabase;
                break;
            }
        }
    }

    public cambiarCoche(id: string, nuevoCoche: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.coche = nuevoCoche;
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

    public verIdDeSocket(idDatabase: string) {
        for (let usuario of this.lista) {
            if (usuario.idDatabase === idDatabase) {
                return usuario.id
            }
        }
    }

    public verIdLista(idDatabase: string) {

        const ids = [];

        for (let usuario of this.lista) {
            if (usuario.idDatabase === idDatabase) {
                ids.push(usuario.id);
            }
        }

        return ids;
    }
}