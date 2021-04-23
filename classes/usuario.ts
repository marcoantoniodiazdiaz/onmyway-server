

export class Usuario {

    public id: string;
    public nombre: string;
    public tipo: string;
    public database: string;
    // Adicionales
    public lat: number;
    public lon: number;
    public emitiendo: boolean;
    public token: string;
    public coche: object | null;

    constructor(id: string) {
        this.id = id;
        this.nombre = 'unknown';
        this.tipo = 'unknown';
        this.database = 'unknown';
        // Adicionales
        this.lat = 0;
        this.lon = 0;
        this.emitiendo = false;
        this.token = 'unknown';
        this.coche = null;
    }

}