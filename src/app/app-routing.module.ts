import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { CreateBetComponent } from './create-bet/create-bet.component';
import { AccountComponent } from './account/account.component';
import { ControlComponent } from './control/control.component';
import { OpenComponent } from './open/open.component';
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
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from './error/error.component';
import { WithdrawalComponent } from './account/withdrawal/withdrawal.component';
import { WithdrawalReverseComponent } from './account/withdrawal-reverse/withdrawal-reverse.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './auth/auth.guard';
import { SuccessComponent } from './success/success.component';
import { SomethingWrongComponent } from './something-wrong/something-wrong.component';
import { BalanceTransferComponent } from './balance-transfer/balance-transfer.component';
import { SettedComponent } from './account/setted/setted.component';
import { FootballComponent } from './account/football/football.component';
import { VolleyballComponent } from './account/volleyball/volleyball.component';
import { BasketballComponent } from './account/basketball/basketball.component';
import { BetslipComponent } from './account/betslip/betslip.component';


const routes: Routes = [
  {path: '', component: ContentComponent, children: [
    {path: 'login', component: LoginComponent},
  ]},
  {path: 'loading', component: LoadingSpinnerComponent},
  {path: 'account', component: AccountComponent,
  // canActivate: [AuthGuard],
  children: [
    {path: 'balance-transfer', component: BalanceTransferComponent},
    {path: 'setted', component: SettedComponent },
    {path: 'deposit', component: DepositComponent},
    {path: 'withdrawal', component: WithdrawalComponent},
    {path: 'error', component: SomethingWrongComponent},
    {path: 'bet/success', component: SuccessComponent},
    {path: 'withdrawal-reverse', component: WithdrawalReverseComponent},
    {path: 'withdrawal-reverse/:id', component: WithdrawalReverseComponent},
    {path: 'open', component: OpenComponent},
    {path: 'bet', component: CreateBetComponent},
    {path: 'football', component: FootballComponent},
    {path: 'tennis', component: VolleyballComponent },
    {path: 'basketball', component: BasketballComponent},
    ] },

  {path: 'register', component: RegisterComponent, children: [
    {path: 'step1', component: StepOneComponent},
    {path: 'step2', component: StepTwoComponent},
    {path: 'step3', component: StepThreeComponent, children: [
      {path: 'error', component: ErrorComponent},
    ]},
  ]},
  {path: 'control', component: ControlComponent, children: [
    {path: 'contact', component: ContactComponent},
    {path: 'approach', component: ControlOurApproachComponent},
    {path: 'policy', component: OurPolicyComponent },
    {path: 'helping', component: HelpingYouStayComponent},
    {path: 'spending', component: SpendingControlsComponent },
    {path: 'timeout', component: TimeOutComponent },
    {path: 'account-safety', component: AccountSafetyComponent },
    {path: 'other-sources', component: OuterSourcesComponent },
    {path: 'gamstop', component: WhatIsGamstopComponent },
    {path: 'gamcare', component: GamecareComponent },
  ]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
