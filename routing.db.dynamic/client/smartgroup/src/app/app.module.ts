import { BrowserModule } from '@angular/platform-browser';

// if you want to use ngModel don't forget to import FormsModule !
import { FormsModule  } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { DebugComponent } from './debug/debug.component';
import { BootstrapModule } from 'bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentComponent,
    LoginComponent,
    DebugComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // here too !
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
