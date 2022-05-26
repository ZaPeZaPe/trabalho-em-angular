import { Component, OnInit } from '@angular/core';
import { Reserva } from '../model/reserva-model';
import { ReservaService } from '../service/reserva.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
})
export class ListarReservaComponent implements OnInit {
  constructor(private reservaService: ReservaService) {}
  lista: Reserva[];
  pipe = new DatePipe('en-US');
  data: string;

  ngOnInit() {
    this.lista = this.reservaService.listar();
  }
}
