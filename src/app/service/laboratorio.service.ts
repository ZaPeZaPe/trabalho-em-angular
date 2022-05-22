import { Injectable } from '@angular/core';
import { Laboratorio } from '../model/laboratorio-models';

@Injectable({
  providedIn: 'root',
})
export class LaboratorioService {
  lab: Laboratorio[];

  labo: { laboratorio: string; id: number }[] = [
    { laboratorio: 'Lami 1', id: 1 },
    { laboratorio: 'Lami 2', id: 2 },
    { laboratorio: 'Lami 3', id: 3 },
    { laboratorio: 'Lami 4', id: 4 },
    { laboratorio: 'Lami 5', id: 5 },
    { laboratorio: 'Lami 6', id: 6 },
    { laboratorio: 'Lami 7', id: 7 },
    { laboratorio: 'Lami 8', id: 8 },
    { laboratorio: 'Lami 9', id: 9 },
    { laboratorio: 'Lami 10', id: 10 },
    { laboratorio: 'Sala Google', id:11 },
  ];

  listar() {
    return this.labo;
  }

  constructor() {}
}
