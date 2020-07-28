import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LazyLoadAssetsModule } from '../lib/lazy-load-assets';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LazyLoadAssetsModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
