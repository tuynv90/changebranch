import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from "./services/login.service";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, SidebarComponent],
  providers: [LoginService]
})
export class SharedModule { }
