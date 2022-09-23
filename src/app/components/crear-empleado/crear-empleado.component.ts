import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading = false;
  id: string | null; //variable que al momento de 'editar' es string y al momento de 'agregar' null.
  titulo = 'Agregar empleado';

  //inyectamos el metodo _empleadoService creado en .service
  //utilizamos la clase router para movernos entre los componentes typescripts
  constructor(
    private fb: FormBuilder,
    private _empledoService: EmpleadoService,
    private router: Router,
    private ngxToastService: NgxToastService, //notificaciones
    private aRouter: ActivatedRoute //Permite acceder al 'id' cuando atravez del boton 'editar'
  ) {
    //formulario
    this.crearEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
    //Capturar la id
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    //cuando se inicializa el componente llamamos al metodo
    this.editarEmpleado();
  }

  //metodos
  modificacionFormulario(){

    this.submitted = true;
    if (this.crearEmpleado.invalid) {
      return;
    }
    if (this.id == null) {
      this.agregarEmpleado();
    }else{
      this.actualizar(this.id);
    }

  }
  //metodo para controlar que los campos del formulario no esten vacios.
  agregarEmpleado() {
    
    //objeto empleado
    const empleado: any = {
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      documento: this.crearEmpleado.value.documento,
      salario: this.crearEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    //cuando aprete agregar empleado se va a mostrar el spinner de carga
    this.loading = true;

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
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  editarEmpleado() {
    //verifico que no sea nulo
    if (this.id != null) {
      this.titulo = 'Editar empleado';
      this.loading = true; //si tarda, que muestre el metodo
      //llamo al servicio, le paso la id, me suscribo xq es un obs y
      //me meto en una function para q me devuelva datos.
      this._empledoService.buscarEmpleado(this.id).subscribe((data) => {
        this.loading = false; //para cancelar el metodo
        //tomo los datos y los muestro en el registro para poder modificarlos
        this.crearEmpleado.setValue({
          //con payload tomo la informacion y la devuelvo al registro.
          nombre: data.payload.data()['nombre'], // con el corchete accedo a ese atributo especifico
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        });
      });
    }
  }
  actualizar(id: string) {
      //Creo el objeto empleado el cual se va a modificar y almacenar el atributo actualizado.
      const empleado: any = {
        nombre: this.crearEmpleado.value.nombre,
        apellido: this.crearEmpleado.value.apellido,
        documento: this.crearEmpleado.value.documento,
        salario: this.crearEmpleado.value.salario,
        fechaActualizacion: new Date(),
      };
      this.loading=true;
      //llamo al servicio 
      this._empledoService.actualizarEmpleado(id, empleado).then(() => {
        this.loading=false;
        //notificacion
        this.ngxToastService.onInfo('Actualizacion exitosa','Usuario actualizado con exito');
          //funcion que me redirecciona al componente lista-empleados al agregar.
          this.router.navigate(['/lista-empleados']);
      })
      

  }
}
