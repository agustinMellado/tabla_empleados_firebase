import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';

import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css'],
})
export class CrearEmpleadoComponent implements OnInit {
  crearEmpleado: FormGroup;
  submitted = false;
  //inyectamos el metodo _empleadoService creado en .service
  //utilizamos la clase router para movernos entre los componentes typescripts
  constructor(
    private fb: FormBuilder,
    private _empledoService: EmpleadoService,
    private router: Router,
    private ngxToastService: NgxToastService
  ) {
    //formulario
    this.crearEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  //metodos

  //metodo para controlar que los campos del formulario no esten vacios.
  agregarEmpleado() {
    this.submitted = true;
    if (this.crearEmpleado.invalid) {
      return;
    }
    //objeto empleado
    const empleado: any = {
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      documento: this.crearEmpleado.value.documento,
      salario: this.crearEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    //al ejecutar el metodo damos dos acciones en caso de un registro correcto o no
    this._empledoService
      .agregarEmpleado(empleado)
      .then(() => {
        //notificacion  al crear con exito el registro.
        this.ngxToastService.onSuccess(
          'Registro exitoso!',
          'Se a registrado con exito'
        );
        
        //funcion que me redirecciona al componente lista-empleados al agregar.
        this.router.navigate(['/lista-empleados']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
