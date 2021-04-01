import { Marcador } from './marcador';
export class Mapa {
    constructor() { }

    private marcadores: { [key: string]: Marcador } = {};

    getMarcadores() {
        return this.marcadores;
    }

    borrarMarcador(id: string) {
        delete this.marcadores.id;
        this.getMarcadores();
    }

    moverMarcador(marcador: Marcador) {
        this.marcadores[marcador.id].lat = marcador.lat;
        this.marcadores[marcador.id].lon = marcador.lon;

    }
}