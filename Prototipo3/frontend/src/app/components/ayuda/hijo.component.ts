import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.css']
})
export class HijoComponent implements OnInit {

  cabecera = 'imagenes/ayuda/cabecera.png';
  panel2 = false;

  constructor() { }

  ngOnInit() {
  }

}