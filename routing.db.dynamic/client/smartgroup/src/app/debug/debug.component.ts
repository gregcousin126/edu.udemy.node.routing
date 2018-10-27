import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})

export class DebugComponent implements OnInit {
	text: String = "hello";
	// @Output is a decorator, a special angular tag.
	// Il dit a angular que cet attribut peut être envoyé vers d'autres components
	@Output() tick = new EventEmitter<void>();

  constructor() { 
  }

  ngOnInit() {
  }

  onClick() {
	  console.log("click");
	  this.tick.emit();
  }

}
