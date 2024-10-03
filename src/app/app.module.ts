import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from "./layouts/auth/auth.component";
import { IndexComponent } from "./views/index/index.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./views/dashboard/index.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AdminComponent } from "./layouts/admin/admin.component";
import { UsersComponent } from "./views/dashboard/users/users.component";
import { HeaderComponent } from "./components/header/header.component";
import { AddNewMemberComponent } from "./components/add-new-member/add-new-member.component";
import { SearchFromComponent } from "./components/search-form/search-from.component";
import { VarifiedUsersComponent } from "./views/dashboard/users/varified/varified-users.component";
import { BreadcrumbComponent } from "./components/breacrumb/breadcrumb.component";
import { RegisterUserComponent } from "./views/dashboard/users/todayRegistration/users.component";
import { ApprovedOrRejectComponent } from "./views/dashboard/ads/approved-or-reject/approved-or-reject.component";
import { ReportsComponent } from "./views/dashboard/statistics/index.component";
import { TeamMngComponent } from "./views/dashboard/statistics/team/index.component";
import { BannerComponent } from "./views/dashboard/statistics/banners/banner.component";
import { BoostComponent } from "./views/dashboard/messages/boost/index.component";
import { PaymentComponent } from "./views/dashboard/messages/payment/index.component";
import { MessageComponent } from "./components/message/index.component";
import { MessagePage } from "./views/dashboard/messages/index.component";
import { ModalComponent } from "./components/modal/index.component";
import { DeleteModalComponent } from "./components/modal/delete/index.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";  // Note the HTTP_INTERCEPTORS import
import { AdDetailsComponent } from "./views/dashboard/ads/details/ad-detail.component";
import { AuthInterceptor } from "./services/auth.service";
import { AdsComponent } from "./views/dashboard/ads/ads.component";
import { AdsHistoryComponent } from "./views/dashboard/ads/history/ad-history.component";
import { ToastrModule } from "ngx-toastr";
import { LoaderComponent } from "./components/loader/loader.component";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { HeaderDropdownComponent } from "./components/header-dropdown/header-dropdown.component";
import { CommonModule } from "@angular/common";
import { TtofferGiftsComponent } from "./views/dashboard/ttoffer-gitfs/index.component";
import { CreateTtofferGiftComponent } from "./views/dashboard/ttoffer-gitfs/create/index.component";
import { NotificationsComponent } from "./views/dashboard/notifications/notifications.component";
import { CreateProductComponent } from "./views/dashboard/ads/create/create-product.component";
import { PaymentHistoryComponent } from "./views/dashboard/payment-history/payment-history.component";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AuthComponent,
    DashboardComponent,
    SidebarComponent,
    AdminComponent,
    UsersComponent,
    HeaderComponent,
    AddNewMemberComponent,
    SearchFromComponent,
    VarifiedUsersComponent,
    BreadcrumbComponent,
    RegisterUserComponent,
    ApprovedOrRejectComponent,
    AdsHistoryComponent,
    ReportsComponent,
    TeamMngComponent,
    BannerComponent,
    BoostComponent,
    PaymentComponent,
    MessageComponent,
    MessagePage,
    ModalComponent,
    DeleteModalComponent,
    AdDetailsComponent,
    AdsComponent,
    LoaderComponent,
    HeaderDropdownComponent,
    TtofferGiftsComponent,
    CreateTtofferGiftComponent,
    NotificationsComponent,
    CreateProductComponent,
    PaymentHistoryComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTableComponent,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      timeOut: 5000,
      progressBar: true
    })
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
