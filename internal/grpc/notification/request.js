import { clientNotification } from './client';
import { CallGrpc } from '../../../external/grpc/lib/call';

// export async function getWallet(_id, type) {
//   try {
//     // eslint-disable-next-line new-cap
//     return await CallGrpc(clientWallet, 'getWallet', { _id, type });
//   } catch (err) {
//     console.log('Error GRPC : ', err);
//     return false;
//   }
// }

export async function updateCodeNotify(id, code) {
    try {
        return await CallGrpc(clientNotification, 'updateNotify', { id, code });
    } catch (error) {
        return false;
    }
}

export async function createBlockUser(blockerId, type, targetId) {
    try {
        return await CallGrpc(clientNotification, 'createBlockUser', { blockerId, type, targetId });
    } catch (error) {
        return false;
    }
}
