import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from './error.service';
import { Error } from './error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
	errors: Array<Error>;
  constructor(private errorService: ErrorService) { 

  }

  ngOnInit() {
  	this.errors = new Array<Error>();
  	this.errorService.errorEmitter.subscribe(
  		(error: Error) => {
  			this.errors.push(error)
  		}
  	)
  }

  onClose(index) {
  	this.errors.splice(index, 1);
  }

}
