import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { AdminPanelComponent } from './user/admin-panel/admin-panel.component';
import { RegisterComponent } from './user/register/register.component';
import { MainComponent } from './main/main.component';
import { OrderComponent } from './order/order.component';
import { ShopComponent } from './shop/shop.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
const routes: Routes = [
  { path: '/', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: AdminPanelComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    AdminPanelComponent,
    RegisterComponent,
    MainComponent,
    OrderComponent,
    ShopComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
