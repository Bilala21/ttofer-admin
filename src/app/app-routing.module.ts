import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { DashboardComponent } from "./views/dashboard/index.component";
import { AdminComponent } from "./layouts/admin/admin.component";
import { UsersComponent } from "./views/dashboard/users/users.component";
import { VarifiedUsersComponent } from "./views/dashboard/users/varified/varified-users.component";
import { RegisterUserComponent } from "./views/dashboard/users/todayRegistration/users.component";
import { ApprovedOrRejectComponent } from "./views/dashboard/ads/approved-or-reject/approved-or-reject.component";
import { ReportsComponent } from "./views/dashboard/statistics/index.component";
import { TeamMngComponent } from "./views/dashboard/statistics/team/index.component";
import { BannerComponent } from "./views/dashboard/statistics/banners/banner.component";
import { BoostComponent } from "./views/dashboard/messages/boost/index.component";
import { PaymentComponent } from "./views/dashboard/messages/payment/index.component";
import { MessagePage } from "./views/dashboard/messages/index.component";
import { NotfoundComponent } from "./components/not-found/index.component";
import { authGuard } from "./auth.guard";
import { AdsComponent } from "./views/dashboard/ads/ads.component";
import { AdsHistoryComponent } from "./views/dashboard/ads/history/ad-history.component";
import { AdDetailsComponent } from "./views/dashboard/ads/details/ad-detail.component";
import { TtofferGiftsComponent } from "./views/dashboard/ttoffer-gitfs/index.component";
import { CreateTtofferGiftComponent } from "./views/dashboard/ttoffer-gitfs/create/index.component";
import { NotificationsComponent } from "./views/dashboard/notifications/notifications.component";


const routes: Routes = [
  { path: "", component: IndexComponent },
  // dashboard routing
  {
    path: "dashboard",
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "users/verified", component: VarifiedUsersComponent },
      { path: "users/today-registration", component: RegisterUserComponent },
      { path: "ads/all", component: AdsComponent },
      { path: "ads/approve-or-reje", component: ApprovedOrRejectComponent },
      { path: "ads/history", component: AdsHistoryComponent },
      { path: "ads/details", component: AdDetailsComponent },
      { path: "statistics/reports", component: ReportsComponent },
      { path: "statistics/team", component: TeamMngComponent },
      { path: "statistics/banners", component: BannerComponent },
      { path: "messages", component: MessagePage },
      { path: "messages/boost", component: BoostComponent },
      { path: "messages/payment", component: PaymentComponent },
      { path: "ttoffer-gifts", component: TtofferGiftsComponent },
      { path: "ttoffer-gift/create", component: CreateTtofferGiftComponent },
      { path: "notifications", component: NotificationsComponent },
      { path: "logout", component: UsersComponent },
      { path: "**", component: NotfoundComponent },

    ],
  },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
