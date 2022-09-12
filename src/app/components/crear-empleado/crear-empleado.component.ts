import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css'],
})
export class CrearEmpleadoComponent implements OnInit {
  crearEmpleado: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
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
agregarEmpleado(
  ){
  this.submitted=true;
  if(this.crearEmpleado.invalid){
    return;
  }
  const empleado:any={
    nombre: this.crearEmpleado.value.nombre,
    apellido: this.crearEmpleado.value.apellido,
    documento: this.crearEmpleado.value.documento,
    salario:this.crearEmpleado.value.salario,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  }
  console.log(empleado);

}

}
