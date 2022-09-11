import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { CrearEmpleadoComponent } from './componets/crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    CrearEmpleadoComponent,
    ListaEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
