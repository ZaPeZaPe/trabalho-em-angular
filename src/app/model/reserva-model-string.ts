export class ReservaString {
  solicitante: string;
  laboratorio: string;
  data: string;
  inicio: string;
  termino: string;

  constructor(
    solicitante: string,
    laboratorio: string,
    data: string,
    inicio: string,
    termino: string
  ) {
    this.solicitante = solicitante;
    this.laboratorio = laboratorio;
    this.data = data;
    this.inicio = inicio;
    this.termino = termino;
  }
}
