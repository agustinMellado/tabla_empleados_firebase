import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private firestore: AngularFirestore) {}

  agregarEmpleado(empleado: any): Promise<any> {
    //creamos una coleccion llamada empleados, le agregamos empleado y retornamos
    return this.firestore.collection('empleado').add(empleado);
  }
  //agrega los empleados creados a la lista-empleados
  getEmpleados(): Observable<any> {
    //retorna la coleccion empleados, con snapshotChanges() muestra los cambios en tiempo real.
    //ref=>ref.orderBy('fechaCreacion','asc') es para indicar q quiero ordenar y de q manera.
    return this.firestore
      .collection('empleado', (ref) => ref.orderBy('fechaCreacion', 'asc'))
      .snapshotChanges();
  }
  //metodo para eliminar empleados de la lista-empleados
  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleado').doc(id).delete();
  }

  buscarEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleado').doc(id).snapshotChanges();
  }
  actualizarEmpleado(id:string, data:any): Promise<any> {
    //tomo el objeto a actualizar con el id y con update le paso la data a actualizar
    return this.firestore.collection('empleado').doc(id).update(data);
  }
}
