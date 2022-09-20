import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
})
export class ListaEmpleadosComponent implements OnInit {
  //arreglo para almacenar toda la informacion de los empleados.
  empleados: any[] = [];

  constructor(
    private _empleadoService: EmpleadoService,
    private ngxToastService: NgxToastService
  ) {}

  ngOnInit(): void {
    //cuando se inicialice el componente, llamo al metodo
    this.getEmpleados();
  }
  //toma los empleados y los mete a la lista.
  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe((data) => {
      //cada vez que se ejecute lo llamo vacio, sino me duplica la tabla
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          //creamos un objeto
          id: element.payload.doc.id, //tomo cada elemento por su id
          ...element.payload.doc.data(), // con spread operator copio la informacion de esa id
        });
      });
      console.log(this.empleados);
    });
  }
  eliminarEmpleado(id: string) {
    //llamo al servicio y paso por parametro id,
    this._empleadoService
      .eliminarEmpleado(id)
      .then(() => {
        this.ngxToastService.onDanger('REGISTRO ELIMINADO','Empleado eliminado con exito!')
      }) //esto de deberia hacer con un interseptor
      .catch((error) => {
        console.log(error);
      });
  }
}
