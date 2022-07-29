import { combineReducers } from 'redux';

import { authenticatedUser } from './login';
import { dashboard } from './dashboard';
import { forgotPassword } from './ForgotPassword';
import { users } from './users';
import { csvData } from './csvData';
import { diaryManagement } from './diaryManagment';
import { lead } from './Lead';
import { accountDetail } from './AccountDetail';
import { accounts } from './Accounts';
import { reports } from './Reports';
import { engagementHub } from './EngagementHub';
import { unsubscribe } from './Unsubscribe';
import { userProfile } from './userProfile';
import { duplicateEnquire } from './DuplicateEnquire';

const rootReducer = combineReducers({
    authenticatedUser,
    dashboard,
    forgotPassword,
    users,
    csvData,
    diaryManagement,
    lead,
    accountDetail,
    accounts,
    reports,
    engagementHub,
    unsubscribe,
    userProfile,
    duplicateEnquire
});

export default rootReducer;