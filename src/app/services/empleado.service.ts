import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private firestore: AngularFirestore){}


  agregarEmpleado(empleado: any):Promise<any>  {
    //creamos una coleccion llamada empleados, le agregamos empleado y retornamos
    return this.firestore.collection('empleado').add(empleado);
  }
  //agrega los empleados creados a la lista-empleados
  getEmpleados():Observable<any> {
    //retorna la coleccion empleados, con snapshotChanges() muestra los cambios en tiempo real.
    //ref=>ref.orderBy('fechaCreacion','asc') es para indicar q quiero ordenar y de q manera.
    return this.firestore.collection('empleado',ref=>ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }

}
