import { Router } from 'express';

// User
import userRoute from '../../components/user/user.route';

// Follower
import followerRoute from '../../components/followers/followers.route';

// Store
import storeRoute from '../../components/store/store.router';

// Country
import countryRoute from '../../components/country/country.route';

// Zone
import stateRoute from '../../components/state/state.route';

// Admin
import adminRoute from '../../components/admin/admin.route';

// Policy
import policyRoute from '../../components/policy/policy.route';

// News
import newsRoute from '../../components/admin/news/news.route';

// SlideShow
import slideShowRoute from '../../components/admin/slideshow/slideManagement.route';

// Link
import listLinkRoute from '../../components/link/link.route';

// Problem for Support
import problemSupportRoute from '../../components/problem/problem.route';

// Support
import supportRoute from '../../components/support/support.route';

// BanKList
import bankListRoute from '../../components/bankInfo/bankInfo.route';
import ReportRoute from '../../components/admin/report/report.route';

// Report
import reportRoute from '../../components/report/report.route';

// Payment Limit
import PaymentLimitRouter from '../../components/paymentLimit/paymentLimit.route';

const router = new Router();
// User
router.use('/users', [userRoute, bankListRoute]);

// Follower
router.use('/follower', [followerRoute]);

// Store
router.use('/stores', [storeRoute]);

// Country
router.use('/countries', [countryRoute]);

// Zone
router.use('/states', [stateRoute]);

// Admin
router.use('/admin', [adminRoute]);

// Policy
router.use('/policy', [policyRoute]);

// News
router.use('/news', [newsRoute]);

// Slideshow
router.use('/slideshow-home-page', [slideShowRoute]);

// ListLink
router.use('/link', [listLinkRoute]);

// ProblemSupport
router.use('/problem-support', [problemSupportRoute]);

router.use('/support', [supportRoute]);

router.use('/admin/report-user', ReportRoute);

// Report
router.use('/report-chat/', [reportRoute]);

// Payment
router.use('/payment-limit', [PaymentLimitRouter]);

export default router;
