import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
//configuracion de rutas
const routes: Routes = [
  //redireccion automatica a lista empleados.
  {path: '', redirectTo: 'lista-empleados', pathMatch: 'full'},
  {path: 'lista-empleados', component: ListaEmpleadosComponent},
  {path: 'crear-empleado', component:CrearEmpleadoComponent},
  //comodin de redireccion para evitar rutas inexistentes
  {path:'**', redirectTo: 'lista-empleados', pathMatch: 'full'},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
