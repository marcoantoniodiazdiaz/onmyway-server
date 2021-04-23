export class Viajes {

    public estado: string;
    public oculto: boolean;

    constructor(
        public id: string,
        public usuario: { socket: string, data: object },
        public conductor: { socket: string, data: object } | null,
        public from: { text: string, lat: number, lon: number },
        public to: { text: string, lat: number, lon: number },
        public coche: object | null,
        public precio: number,
        public distancia: number,
        public comentarios: string | null,
    ) {
        this.estado = 'PENDING';
        this.oculto = false;
    }
}