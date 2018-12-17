import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { CollectionsComponent } from './collections/collections.component';
import { ToarrayPipe } from './toarray.pipe';
import { SignupComponent } from './signup/signup.component';
import { ListComponent } from './list/list.component';
import { SingleCollectionComponent } from './single-collection/single-collection.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageItemsComponent } from './manage-items/manage-items.component';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { DmcaComponent } from './dmca/dmca.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ComplaintsComponent } from './complaints/complaints.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HomePageComponent,
    CatalogComponent,
    CartComponent,
    CollectionsComponent,
    ToarrayPipe,
    SignupComponent,
    ListComponent,
    SingleCollectionComponent,
    ManageUsersComponent,
    ManageItemsComponent,
    ManageCommentsComponent,
    DmcaComponent,
    PrivacyComponent,
    ComplaintsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
