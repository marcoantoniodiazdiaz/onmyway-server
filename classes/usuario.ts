

export class Usuario {

    public id: string;
    public nombre: string;
    public tipo: string;
    public idDatabase: string | null;
    // Adicionales
    public lat: number;
    public lon: number;
    public emitiendo: boolean;
    public nToken: string;
    public coche: string;

    constructor(id: string) {
        this.id = id;
        this.nombre = 'device-unknown';
        this.tipo = 'unknown';
        this.idDatabase = null;
        // Adicionales
        this.lat = 0;
        this.lon = 0;
        this.emitiendo = false;
        this.nToken = 'unknown';
        this.coche = 'No seleccionado';
    }

}