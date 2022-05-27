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
  hoje: Date = new Date();
  pipe = new DatePipe('en-US');
  hojeString: string = this.pipe.transform(this.hoje, 'dd/MM/yyyy');
  formulario: FormGroup;
  minutos: number = 0;

  isNomeBad: boolean;
  isNomeNull: boolean;
  isLamiNull: boolean;
  isDataBad: boolean;
  isDataNull: boolean;
  isHoraINull: boolean;
  isHoraFNull: boolean;
  isHoraFBad: boolean;
  isEverythingGood: boolean;

  constructor(
    private reservaService: ReservaService,
    private laboratorioService: LaboratorioService
  ) {}

  labs: Laboratorio[];

  ngOnInit(): void {
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
    var dataAgendadaString = this.pipe.transform(new Date(data), 'dd/MM/yyyy');
    var dataAgenParticionada = dataAgendadaString.split('/');
    var dataHojeParticionada = this.hojeString.split('/');
    if (data == null) {
      this.isDataNull = true;
      return false;
    }
    if (dataAgenParticionada[2].toString().length != 4) {
      this.isDataBad = true;
      return false;
    }
    if (this.calcularData(dataHojeParticionada, dataAgenParticionada)) {
      this.isDataBad = true;
      return false;
    }
    return true;
  }

  calcularData(dataHoje: string[], dataAgen: string[]) {
    var diaHoje: number = Number(dataHoje[0]);
    var mesHoje: number = Number(dataHoje[1]);
    var anoHoje: number = Number(dataHoje[2]);
    var diaAgen: number = Number(dataAgen[0]);
    var mesAgen: number = Number(dataAgen[1]);
    var anoAgen: number = Number(dataAgen[2]);
    var qtdDias: number;

    qtdDias = diaAgen - diaHoje;
    qtdDias += (mesAgen - mesHoje) * 30;

    if (qtdDias > 90) {
      return true;
    }

    if (anoHoje - anoAgen == -1) {
      if (mesHoje - mesAgen != 10) {
        return true;
      }
    } else if (anoHoje - anoAgen != 0) {
      return true;
    }

    return false;
  }

  validarLami(lami: number) {
    if (lami == null) {
      this.isLamiNull = true;
      return false;
    }
    return true;
  }

  validarHora(horaI: Time, horaF: Time) {
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
    if (this.calcularMinutos(horaI, horaF) < 85) {
      this.isHoraFBad = true;
      return false;
    }
    return true;
  }

  calcularMinutos(horaI: Time, horaF: Time) {
    var minutosString = String(horaF + ':' + horaI).split(':');
    this.minutos = (Number(minutosString[0]) - Number(minutosString[2])) * 60;
    this.minutos += Number(minutosString[1]) - Number(minutosString[3]);
    return this.minutos;
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

  push() {
    this.reservaService.doPush(
      this.formulario.value.nome,
      this.formulario.value.lab,
      this.formulario.value.data,
      this.formulario.value.horaI,
      this.formulario.value.horaF
    );
  }

  limpar() {
    this.formulario.reset();
  }

  enviar() {
    const nome: string = this.formulario.value.nome;
    const lami: number = this.formulario.value.lab;
    const data: Date = this.formulario.value.data;
    const horaI: Time = this.formulario.value.horaI;
    const horaF: Time = this.formulario.value.horaF;
    this.setFalse();

    if (
      this.validarNome(nome) &&
      this.validarLami(lami) &&
      this.validarData(data) &&
      this.validarHora(horaI, horaF)
    ) {
      this.push();
      this.isEverythingGood = true;
      this.limpar();
    } else {
      this.isEverythingGood = false;
    }
  }
}
