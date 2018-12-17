import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { CollectionsComponent } from './collections/collections.component';
import { SignupComponent } from './signup/signup.component';
import { ListComponent } from './list/list.component';
import { SingleCollectionComponent } from './single-collection/single-collection.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageItemsComponent } from './manage-items/manage-items.component';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { DmcaComponent } from './dmca/dmca.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ComplaintsComponent } from './complaints/complaints.component';

const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: HomePageComponent},
    {path: "catalog", component: CatalogComponent},
    {path: "cart", component: CartComponent},
    {path: "collections", component: CollectionsComponent},
    {path: "signup", component: SignupComponent},
    {path: "list", component: ListComponent},
    {path: "cart/:user/:cart", component: SingleCollectionComponent},
    {path: "managepeople", component: ManageUsersComponent},
    {path: "manageitems", component: ManageItemsComponent},
    {path: "managecomments", component: ManageCommentsComponent},
    {path: "dmca", component: DmcaComponent},
    {path: "privacy", component: PrivacyComponent},
    {path: "complaints", component: ComplaintsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
