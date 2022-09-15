import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
})
export class ListaEmpleadosComponent implements OnInit {
  //arreglo para almacenar toda la informacion de los empleados.
  empleados: any[] = [];

  constructor(private _empledoService: EmpleadoService) {}

  ngOnInit(): void {
    //cuando se inicialice el componente, llamo al metodo
    this.getEmpleados();
  }
  //toma los empleados y los mete a la lista.
  getEmpleados() {
    this._empledoService.getEmpleados().subscribe((data) => {
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
  });
}

}
