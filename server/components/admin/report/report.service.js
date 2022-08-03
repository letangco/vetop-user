import { REPORT } from '../../../../external/constants/constants';
import { error500 } from '../../../../external/util/error';
import StaticReport from '../../user/staticReport';

export async function getReports() {
  try {
    const promises = await Promise.all([
      StaticReport.findOne({ type: REPORT.USER }),
      StaticReport.findOne({ type: REPORT.USER_ONL }),
      StaticReport.findOne({ type: REPORT.STORE }),
    ]);
    return {
      user: promises[0]?.data || 0,
      userOnl: promises[1]?.data || 0,
      store: promises[2]?.data || 0,
    };
  } catch (e) {
    return error500(e);
  }
}
