export class Viajes {

    public id: string;
    public usuario: string;
    public usuarioId: string;
    public usuarioFoto: string;
    public fromLat: number;
    public fromLon: number;
    public fromEscrito: string;
    public toEscrito: string;
    public toLat: number;
    public toLon: number;
    public estado: string;
    public conductor: string;
    public conductorId: string;
    public conductorFoto: string;
    public comentarios: string;
    public precio: number;
    public distancia: number;
    public coche: object | null;
    public oculto: boolean;

    constructor(id: string, usuario: string, usuarioId: string, usuarioFoto: string, fromLat: number, fromLon: number, toLat: number, toLon: number, fromEscrito: string, toEscrito: string, precio: number, distancia: number, comentarios: string) {
        this.id = id;
        this.usuario = usuario;
        this.usuarioId = usuarioId;
        this.usuarioFoto = usuarioFoto;
        this.fromLat = fromLat;
        this.fromLon = fromLon;
        this.toLat = toLat;
        this.toLon = toLon;
        this.fromEscrito = fromEscrito;
        this.toEscrito = toEscrito;
        this.estado = 'PENDING';
        this.conductor = 'PENDING';
        this.conductorFoto = 'PENDING';
        this.conductorId = 'PENDING';
        this.precio = precio;
        this.distancia = distancia;
        this.coche = null;
        this.comentarios = comentarios;
        this.oculto = false;
    }
}