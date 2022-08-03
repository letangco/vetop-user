import User from '../../user/user.model';
import Store from '../../store/store.model';
import SimHistory from '../../simHistory/simHistory.model';
import Staff from '../../staff/staff.model';
import Follow from '../../followers/followers.model';
import BankInfo from '../../bankInfo/bankInfo.model';
import Report from '../../report/report.model';
import Comment from '../../comment/comment.model';

export async function removeAllData(list) {
    try {
        const promise = list.map(async (key, index) => {
            switch (list[index]) {
                case 'user':
                    await User.deleteMany();
                    break;
                case 'follow':
                    await Follow.deleteMany();
                    break;
                case 'store':
                    await Store.deleteMany();
                    break;
                case 'bankInfo':
                    await BankInfo.deleteMany();
                    break;
                case 'simHistory':
                    await SimHistory.deleteMany();
                    break;
                case 'staff':
                    await Staff.deleteMany();
                    break;
                case 'report':
                    await Report.deleteMany();
                    break;
                case 'comment':
                    await Comment.deleteMany();
                    break;
                default:
                    break;
            }
        });
        await Promise.all(promise);
        return true;
    } catch (error) {
        return error500(error);
    }
}
