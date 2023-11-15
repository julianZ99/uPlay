export class Dolar {
    currency: string;
    casa: string;
    nombre: string;
    compra: number;
    venta: number;
    fechaActualizacion: Date;
  
    constructor(
      moneda: string,
      casa: string,
      nombre: string,
      compra: number,
      venta: number,
      fechaActualizacion: string
    ) {
      this.currency = moneda;
      this.casa = casa;
      this.nombre = nombre;
      this.compra = compra;
      this.venta = venta;
      this.fechaActualizacion = new Date(fechaActualizacion);
    }
  }