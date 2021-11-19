import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MetronomeLayoutComponent } from './metronome/metronome-layout/metronome-layout.component';
import { ControlsComponent } from './metronome/controls/controls.component';
@NgModule({
  declarations: [
    AppComponent,
    MetronomeLayoutComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
