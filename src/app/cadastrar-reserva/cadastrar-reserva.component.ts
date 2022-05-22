import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Laboratorio } from '../model/laboratorio-models';
import { LaboratorioService } from '../service/laboratorio.service';
import { ReservaService } from '../service/reserva.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastrar-reserva',
  templateUrl: './cadastrar-reserva.component.html',
})
export class CadastrarReservaComponent implements OnInit {
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  formulario: FormGroup;

  isNomeBad: boolean;
  isNomeNull: boolean;
  isLamiNull: boolean;
  isDataBad: boolean;
  isDataNull: boolean;
  isHoraINull: boolean;
  isHoraFNull: boolean;
  isHoraFBad: boolean;

  constructor(
    private reservaService: ReservaService,
    private laboratorioService: LaboratorioService
  ) {}

  labs: Laboratorio[];

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    this.labs = this.laboratorioService.listar();
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      lab: new FormControl(null),
      data: new FormControl(null),
      horaI: new FormControl(null),
      horaF: new FormControl(null),
    });
  }

  validarNome(nome: string) {
    if (nome == null) {
      this.isNomeNull = true;
      return false;
    }
    if (nome.length < 3) {
      this.isNomeBad = true;
      return false;
    }
    return true;
  }

  validarData(data: Date) {
    var dataNova = this.pipe.transform(data, 'dd/MM/yyyy');
    if (data == null) {
      this.isDataNull = true;
      return false;
    }
    if (dataNova <= this.todayWithPipe) {
      this.isDataBad = true;
      return false;
    }
    return true;
  }

  validarLami(lami: number) {
    if (lami == null) {
      this.isLamiNull = true;
      return false;
    }
    return true;
  }

  validarHora(horaI: Time, horaF: Time) {
    console.log(horaF, horaI);
    if (horaI == null) {
      this.isHoraINull = true;
      return false;
    }
    if (horaF == null) {
      this.isHoraFNull = true;
      return false;
    }
    if (horaI >= horaF) {
      this.isHoraFBad = true;
      return false;
    }
    return true;
  }

  setFalse() {
    this.isNomeBad = false;
    this.isNomeNull = false;
    this.isLamiNull = false;
    this.isDataBad = false;
    this.isDataNull = false;
    this.isHoraINull = false;
    this.isHoraFNull = false;
    this.isHoraFBad = false;
  }

  puxe() {
    this.reservaService.puxar(
      this.formulario.value.nome,
      this.formulario.value.lab,
      this.formulario.value.data,
      this.formulario.value.horaI,
      this.formulario.value.horaF
    );
  }

  enviar() {
    const nome = this.formulario.value.nome;
    const lami = this.formulario.value.lab;
    const data = this.formulario.value.data;
    const horaI = this.formulario.value.horaI;
    const horaF = this.formulario.value.horaF;

    this.setFalse();

    if (
      this.validarNome(nome) &&
      this.validarLami(lami) &&
      this.validarData(data) &&
      this.validarHora(horaI, horaF)
    ) {
      this.puxe();
    }

    console.log(this.formulario.value.lab);
    for (let atributes of this.reservaService.listar()) {
      console.log(atributes.data);
    }
  }
}
