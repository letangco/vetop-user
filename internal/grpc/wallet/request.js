import { clientWallet } from './client';
import { CallGrpc } from '../../../external/grpc/lib/call';

export async function createWallet(_id, type, refer = '') {
  try {
    return await CallGrpc(clientWallet, 'createWallet', { _id, type, refer });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function getWalletSim(sim) {
  try {
    return await CallGrpc(clientWallet, 'getWalletSim', { sim });
  } catch (error) {
    return false;
  }
}

export async function updateWalletFromSim(_id, sim, type, vetic, pin, tax, stock, money) {
  try {
    return await CallGrpc(clientWallet, 'updateWalletFromSim', {
      _id, sim, type, vetic, pin, tax, stock, money
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function paymentPaymeCreate(user, amount, code) {
  try {
    return await CallGrpc(clientWallet, 'paymentPaymeCreate', {
      user, amount, code
    });
  } catch (error) {
    return false
  }
}

export async function getTransactionChangeCode(userId) {
  try {
    console.log(userId)
    return await CallGrpc(clientWallet, 'getTransactionChangeCode', { userId })
  } catch (error) {
    console.log(error);
    return false
  }
}

export async function getIdFANAdmin(_id) {
  try {
    return await CallGrpc(clientWallet, 'getIdFANAdmin', { _id });
  } catch (error) {
    return false;
  }
}

