import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CadastrarReservaComponent } from './cadastrar-reserva/cadastrar-reserva.component';
import { ListarReservaComponent } from './listar-reserva/listar-reserva.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, HelloComponent, CadastrarReservaComponent, ListarReservaComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
