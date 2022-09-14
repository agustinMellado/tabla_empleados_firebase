import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private firestore: AngularFirestore){}


  agregarEmpleado(empleado: any):Promise<any>  {
    //creamos una coleccion llamada empleados, le agregamos empleado y retornamos
    return this.firestore.collection('empleado').add(empleado);
  }
}
