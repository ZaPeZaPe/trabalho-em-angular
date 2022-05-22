import { Time } from '@angular/common';

export class Reserva {
  /*constructor(solicitante:string; laboratorio:number; data:Date; inicio:Time; termino:Time){
    solicitante=solicitante;
    laboratorio=laboratorio;
    data=data;
    inicio=inicio;
    termino=termino;
  }*/

  solicitante: string;
  laboratorio: number;
  data: Date;
  inicio: Time;
  termino: Time;

  constructor(
    solicitante: string,
    laboratorio: number,
    data: Date,
    inicio: Time,
    termino: Time
  ) {
    this.solicitante = solicitante;
    this.laboratorio = laboratorio;
    this.data = new Date(data);
    this.inicio = inicio;
    this.termino = termino;
  }
}
