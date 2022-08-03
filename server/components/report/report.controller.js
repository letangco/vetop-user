import * as ReportService from './report.service';

export async function createReport(req, res) {
    try {
        const options = {
            reporter: req.user.storeId || req.user._id,
            ...req.body
        };
        const payload = await ReportService.createReport(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

