import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import IndexComponent from './containers/Login';
import ForgetPassword from './containers/ForgetPassword';
import Dashboard from './containers/dashboard';
import DiaryManagement from './containers/diaryManagement';
import PrivateRoute from './routes/PrivateRoute';
import MainLayout from './pages/MainLayout';
import Engagement from './containers/Engagement';
import EngagementEditCampaign from './containers/Engagement/Campaigns/EditCampaign';
import ContactEditForm from './containers/Engagement/Lists/ContactEditForm';
import Accounts from './containers/Accounts';
import AccountDetails from './containers/accountDetails';
import NotFound from './pages/NotFound/index';
import Users from './containers/Users';
import Reports from './containers/Reports'
import DuplicateCheck from './containers/duplicateCheck'
import Unsubscribe from './containers/Unsubscribe';
import UserProfile from './containers/UserProfile/UserProfile';
import {history} from './utils/helper'

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import { LicenseManager } from 'ag-grid-enterprise';
const licenseKey = "CompanyName=8bit solutions,LicensedApplication=OFG CRM,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-017542,ExpiryDate=22_July_2022_[v2]_MTY1ODQ0NDQwMDAwMA==7724ab981632a426882fea89456e30d8";
LicenseManager.setLicenseKey(licenseKey);

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={IndexComponent} />
                <Route exact path="/login" component={IndexComponent} />
                <Route exact path="/forgetpassword" component={ForgetPassword} />
                <Route exact path="/unsubscribe/:id" component={Unsubscribe} />
                <MainLayout>
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/engagement" component={Engagement} />
                        <PrivateRoute exact path="/engagement/campaign/:id" component={EngagementEditCampaign} />
                        <PrivateRoute exact path="/engagement/lists/edit/:id" component={ContactEditForm} />
                        <PrivateRoute exact path="/accounts" component={Accounts} />
                        <PrivateRoute exact path="/diary-management" component={DiaryManagement} />
                        <PrivateRoute exact path="/account-details/:id" component={AccountDetails} />
                        <PrivateRoute exact path="/users" component={Users} />
                        <PrivateRoute exact path="/report" component={Reports} />
                        <PrivateRoute exact path="/account/enquirer-list" component={DuplicateCheck} />
                        <PrivateRoute exact path="/user-profile" component={UserProfile} />
                        {/*Page Not Found*/}
                        <Route component={NotFound} />
                    </Switch>
                </MainLayout>
            </Switch>
        </Router>
    )
}

export default App;
