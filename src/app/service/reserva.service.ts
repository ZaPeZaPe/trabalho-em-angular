import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Reserva } from '../model/reserva-model';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  lista: Reserva[] = [];
  puxar(nome: string, lami: number, data: Date, inicio: Time, termino: Time) {
    this.lista.push(new Reserva(nome, lami, data, inicio, termino));
    console.log('fez push');
  }
  listar() {
    return this.lista;
  }
  constructor() {}
}
