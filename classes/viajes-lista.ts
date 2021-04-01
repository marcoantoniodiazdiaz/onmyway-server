import { Viajes } from './viajes';
import { usuariosConectados } from '../sockets/socket';


export class ViajesLista {
    private lista: Viajes[] = [];

    constructor() { }

    // Agregar un usuario
    public agregar(viaje: Viajes) {
        this.lista.push(viaje);
        return viaje;
    }

    // Obtener lista de viajes
    public getLista() {
        return this.lista.filter(viaje => viaje.estado !== 'END' && viaje.oculto === false);
    }

    // Obtener un viaje
    public getViaje(id: string) {
        return this.lista.find(viaje => viaje.id === id);
    }

    public cambiarEstado(id: string, estado: string) {
        for (let viaje of this.lista) {
            if (viaje.id === id) {
                viaje.estado = estado;
                break;
            }
        }
    }

    public ocultar(id: string) {
        for (let viaje of this.lista) {
            if (viaje.id === id) {
                viaje.oculto = true;
                break;
            }
        }
    }


    public agregarConductorViaje(id: string, conductor: string, conductorId: string, conductorFoto: string, coche: object) {
        for (let viaje of this.lista) {
            if (viaje.id === id) {
                viaje.conductor = conductor;
                viaje.conductorId = conductorId;
                viaje.conductorFoto = conductorFoto;
                viaje.coche = coche;
                break;
            }
        }
    }

    // Borrar Usuario
    public borrarViaje(id: string) {
        const tempUsuario = this.getViaje(id);
        this.lista = this.lista.filter(viaje => viaje.id !== id);
        return tempUsuario;
    }

    // Todos los viajes a los que pertenece un usuario
    public getViajesPorUsuario(usuario: string) {
        usuario = usuariosConectados.getUsuario(usuario)?.idDatabase!;
        console.log(this.lista);
        return this.lista.filter(viaje => (viaje.usuarioId === usuario || viaje.conductorId === usuario) && (viaje.estado === 'ACCEPTED' || viaje.estado === 'INPROGRESS'));
    }
}