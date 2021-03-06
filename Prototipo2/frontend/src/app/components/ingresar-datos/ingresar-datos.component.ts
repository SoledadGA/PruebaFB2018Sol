import {Component, OnInit} from '@angular/core';
import {EstudianteService} from "../../services/estudiante.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-ingresar-datos',
  templateUrl: './ingresar-datos.component.html',
  styleUrls: ['./ingresar-datos.component.css'],
  providers: [EstudianteService]
})
export class IngresarDatosComponent implements OnInit {

  checkControlador = false;
  identificador = localStorage.getItem('tipoTest');
  anioEGB = ['Primero'];
  anioEGB1 = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'Séptimo'];
  paralelo = ['A', 'B', 'C', 'D', 'E', 'F'];
  fecha = new Date();
  txtFecha = (this.fecha.getDate() + '/' + (this.fecha.getMonth() + 1) + '/' + (this.fecha.getFullYear()));
  anioLectivo = [this.fecha.getFullYear() - 1, this.fecha.getFullYear()];
  mostrar = false;
  tipoPrueba = 0;
  Fechita = '';
  discapacidad = '';
  nombreIncorrecto = false;
  anioLectivoIncorrecto = false;
  cursoIncorrecto = false;
  paraleloIncorrecto = false;
  evaluadorIncorrecto = false;

  iniciarFecha() {
    this.Fechita = this.txtFecha;
  }

  tipoTest() {
    if (this.identificador == 'reTest') {
      this.mostrar = true;
      this.tipoPrueba = 1;
    }
    if (this.identificador == 'freeTest') {
      this.mostrar = true;
      this.tipoPrueba = 2;
      console.log(this.tipoPrueba);
      this.anioEGB = this.anioEGB1;
    }
  }

  check() {
    if (this.checkControlador) {
      this.checkControlador = false;
      localStorage.setItem('discapacidad', 'no');
      console.log('no');

    }
    else {
      this.checkControlador = true;
      localStorage.setItem('discapacidad', 'si');
      console.log('chi');
    }
  }

  constructor(private estServ: EstudianteService) {
    this.iniciarFecha();
    console.log(this.Fechita);
  }

  ngOnInit() {
    this.tipoTest();

  }

  guardar(form: NgForm) {
    var constante = 0;
    if (this.tipoPrueba == 0) {
      if (form.controls['nombreEstudiante'].value == '') {
        this.nombreIncorrecto = true;
        //window.alert('Favor ingresar el nombre del Estudiante');
      }
      if (form.controls['anioLectivo'].value === '') {
        this.anioLectivoIncorrecto = true;
        constante = 1;
        //window.alert('Favor ingresar el año lectivo');
      }
      if (form.controls['anioEGB'].value == '') {
        constante = 1;
        this.cursoIncorrecto = true;
        //window.alert('Favor ingresar el año EGB');
      }
      if (form.controls['nombreEvaluador'].value == '') {
        this.evaluadorIncorrecto = true;
        //window.alert('Favor ingresar el nombre del evaluador');
      }
      if ( constante == 0){
        console.log(form.value);
        this.estServ.postEstudiante(form.value).subscribe(res => {
          console.log(res)
        });
        location.href = '/#/areaUno';
      }
    } else {

      if (form.controls['nombreEstudiante'].value == '') {
        this.nombreIncorrecto = true;
        //window.alert('Favor ingresar el nombre del Estudiante');
      }
      if (form.controls['anioLectivo'].value == '') {
        constante = 1;
        this.anioLectivoIncorrecto = true;
        //window.alert('Favor ingresar el año lectivo');
      }
      if (form.controls['anioEGB'].value == '') {
        constante = 1;
        this.cursoIncorrecto = true;
        //window.alert('Favor ingresar el año EGB');
      }
      if (form.controls['paralelo'].value == '') {
        constante = 1;
        this.paraleloIncorrecto = true;
        //window.alert('Favor ingresar el paralelo');
      }
      if (form.controls['nombreEvaluador'].value == '') {
        this.evaluadorIncorrecto = true;
        //window.alert('Favor ingresar el nombre del evaluador');
      }
      if( constante == 0) {
        console.log(form.value);
        this.estServ.postEstudiante(form.value).subscribe(res => {
          console.log(res)
        });
        location.href = '/#/areaUno';
      }

    }

  }


}
