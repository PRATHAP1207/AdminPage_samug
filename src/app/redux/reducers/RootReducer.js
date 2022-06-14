import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import EmployeeReducer from './EmployeeReducer'
import AccountsReducer from './AccountsReducer'
import ModeratorReducer from './ModeratorReducer'
import AdminReducer from './AdminReducer'
import GeneralReducer from './GeneralReducer'
import LoginReducer from './LoginReducer'
import UserReducer from './UserReducer'
import UserTreeReducer from './UserTreeReducer'
import { connectRouter } from 'connected-react-router'
import CurrencyReportReducer from './CurrencyReportReducer'
import DhanTypeReducer from './DhanTypeReducer'
import DhanReportReducer from './DhanReportReducer'
import UserDetailsReportReducer from './UserDetailsReportReducer'
import UploadFileReducer from './UploadFileReducer';
import CouponReducer from "./CouponReducer";
import ReportSubscriptReducer from "./ReportSubScriptReducer";
const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    general: GeneralReducer,
    employee: EmployeeReducer,
    accounts: AccountsReducer,
    moderator: ModeratorReducer,
    admins: AdminReducer,
    login: LoginReducer,
    user: UserReducer,
    usertree: UserTreeReducer,
    CurrencyReportReducer: CurrencyReportReducer,
    DhanTypeReducer: DhanTypeReducer,
    DhanReportReducer: DhanReportReducer,
    UserDetailsReportReducer: UserDetailsReportReducer,
    UploadFileReducer: UploadFileReducer,
    CouponReducer:CouponReducer,
    ReportSubscriptReducer:ReportSubscriptReducer,
})

export default RootReducer

// export default (history) => {
//     return combineReducers({
//         router: connectRouter(history),
//         notifications: NotificationReducer,
//         navigations: NavigationReducer,
//         scrumboard: ScrumBoardReducer,
//         ecommerce: EcommerceReducer,
//         general: GeneralReducer,
//         employee: EmployeeReducer,
//         accounts: AccountsReducer,
//         moderator: ModeratorReducer,
//         admins: AdminReducer,
//         login: LoginReducer,
//         user: UserReducer,
//     })
// }
