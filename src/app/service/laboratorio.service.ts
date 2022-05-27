import { Injectable } from '@angular/core';
import { Laboratorio } from '../model/laboratorio-models';

@Injectable({
  providedIn: 'root',
})
export class LaboratorioService {
  lab: Laboratorio[];

  labo: { laboratorio: string; id: number; bloco: string }[] = [
    { laboratorio: 'Lami 1', id: 404, bloco: 'B' },
    { laboratorio: 'Lami 2', id: 405, bloco: 'B' },
    { laboratorio: 'Lami 3', id: 406, bloco: 'B' },
    { laboratorio: 'Lami 4', id: 407, bloco: 'B' },
    { laboratorio: 'Lami 5', id: 408, bloco: 'B' },
    { laboratorio: 'Lami 6', id: 409, bloco: 'B' },
    { laboratorio: 'Lami 7', id: 410, bloco: 'B' },
    { laboratorio: 'Lami 8', id: 411, bloco: 'B' },
    { laboratorio: 'Lami 9', id: 412, bloco: 'B' },
    { laboratorio: 'Lami 10', id: 413, bloco: 'B' },
    { laboratorio: 'Sala Google', id: 1, bloco: 'Sala Google' },
  ];

  listar() {
    return this.labo;
  }

  constructor() {}
}
