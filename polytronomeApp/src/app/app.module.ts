import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MetronomeLayoutComponent } from './metronome/metronome-layout/metronome-layout.component';
@NgModule({
  declarations: [
    AppComponent,
    MetronomeLayoutComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
