import { all } from 'redux-saga/effects'
import authSagas from './AuthSaga'
import employeeSaga from './EmployeeSaga'
import accountsSaga from './AccountsSaga'
import moderatorSaga from './ModeratorSaga'
import adminSaga from './AdminSaga'
import userTreeSaga from './UserTreeSaga'
import currencySaga from './CurrencySaga'
import dhanReportSaga from './DhanReportSaga'
import dhanTypeSaga from './DhanTypeSaga'
import samugFileSaga from './SamugFileSaga'
import UserReportSaga from './UserReportSaga';
import CouponSaga from "./CouponSaga";
import ReportSubscribeSaga from "./ReportSubscribeSaga";
export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        employeeSaga(),
        accountsSaga(),
        moderatorSaga(),
        adminSaga(),
        userTreeSaga(),
        currencySaga(),
        dhanReportSaga(),
        dhanTypeSaga(),
        samugFileSaga(),
        UserReportSaga(),
        CouponSaga(),
        ReportSubscribeSaga(),
    ])
}
