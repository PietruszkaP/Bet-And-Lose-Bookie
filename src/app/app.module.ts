import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccountComponent } from './account/account.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './aside/aside.component';
import { ControlComponent } from './control/control.component';
import { ContentComponent } from './content/content.component';
import { CreateBetComponent } from './create-bet/create-bet.component';
import { FooterComponent } from './footer/footer.component';
import { LeftComponent } from './footer/left/left.component';
import { RightComponent } from './footer/right/right.component';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { OpenComponent } from './open/open.component';
import { OpenBetComponent } from './open-bet/open-bet.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { ControlOurApproachComponent } from './control/control-our-approach/control-our-approach.component';
import { OurPolicyComponent } from './control/our-policy/our-policy.component';
import { HelpingYouStayComponent } from './control/helping-you-stay/helping-you-stay.component';
import { SpendingControlsComponent } from './control/spending-controls/spending-controls.component';
import { TimeOutComponent } from './control/time-out/time-out.component';
import { AccountSafetyComponent } from './control/account-safety/account-safety.component';
import { OuterSourcesComponent } from './control/outer-sources/outer-sources.component';
import { WhatIsGamstopComponent } from './control/what-is-gamstop/what-is-gamstop.component';
import { GamecareComponent } from './control/gamecare/gamecare.component';
import { RegisterComponent } from './register/register.component';
import { StepOneComponent } from './register/step-one/step-one.component';
import { StepTwoComponent } from './register/step-two/step-two.component';
import { StepThreeComponent } from './register/step-three/step-three.component';
import { LoginComponent } from './login/login.component';
import { DepositComponent } from './account/deposit/deposit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from './error/error.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { WithdrawalComponent } from './account/withdrawal/withdrawal.component';
import { WithdrawalReverseComponent } from './account/withdrawal-reverse/withdrawal-reverse.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ContactComponent } from './contact/contact.component';
import { SuccessComponent } from './success/success.component';
import { SomethingWrongComponent } from './something-wrong/something-wrong.component';
import { BalanceTransferComponent } from './balance-transfer/balance-transfer.component';
import { SliderComponent } from './content/slider/slider.component';
import { SettedComponent } from './account/setted/setted.component';
import { FootballComponent } from './account/football/football.component';
import { VolleyballComponent } from './account/volleyball/volleyball.component';
import { BasketballComponent } from './account/basketball/basketball.component';
import { ShowBetsComponent } from './account/show-bets/show-bets.component';
import { BetslipComponent } from './account/betslip/betslip.component';
import { ConfirmComponent } from './account/football/confirm/confirm.component';






@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NavComponent,
    ContentComponent,
    AsideComponent,
    FooterComponent,
    LeftComponent,
    RightComponent,
    CreateBetComponent,
    AccountComponent,
    ControlComponent,
    OpenComponent,
    OpenBetComponent,
    AccountMenuComponent,
    ControlOurApproachComponent,
    OurPolicyComponent,
    HelpingYouStayComponent,
    SpendingControlsComponent,
    TimeOutComponent,
    AccountSafetyComponent,
    OuterSourcesComponent,
    WhatIsGamstopComponent,
    GamecareComponent,
    RegisterComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    LoginComponent,
    DepositComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    DropdownDirective,
    WithdrawalComponent,
    WithdrawalReverseComponent,
    ContactComponent,
    SuccessComponent,
    SomethingWrongComponent,
    BalanceTransferComponent,
    SliderComponent,
    SettedComponent,
    FootballComponent,
    VolleyballComponent,
    BasketballComponent,
    ShowBetsComponent,
    BetslipComponent,
    ConfirmComponent,
  ],
  imports: [
   BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
