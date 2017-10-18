import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from 'app/layout/request/request.component';
import { RequestListComponent } from 'app/layout/request/request-list/request-list.component';
import { RequestDetailComponent } from 'app/layout/request/request-detail/request-detail.component';

const routes: Routes = [
    { path: '', component: RequestComponent,children:
     [
      { path: '', component: RequestListComponent },
      { path: 'detail/:id', component: RequestDetailComponent}
     ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
