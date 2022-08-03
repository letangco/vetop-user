import grpc from 'grpc';
import {
  getUserInfo, getStoreInfo, addCategoryToStoreHandle,
  getAdminInfo, getStaffInfo, getUserInfoByRefer, updateCategoryStore, updateTotalProductStore,
  getUserInfoByCode, getListUserInfo, updateRatingStore, getListUserInfoByArray, getUserInfoByAdmin,
  getStoreInfoByAdmin, getWishListByArrayProduct, getBankById, getUserByIdStore, updateRatingSimHandle,
  updatePaymentLimitFromOrderHandle, updateNewCodeUserHandle, updatePaymentLimitStaffHandle, getStoreInfoByCodeHandle
} from './handle';
import logger from '../server/api/logger';
import { GRPC_HOST } from '../server/config';
import { getWalletSim } from '../internal/grpc/wallet/request';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};
const protoLoader = require('@grpc/proto-loader');

const host = GRPC_HOST.split(':');
const packageDefinition = protoLoader.loadSync('./external/grpc/proto/user.proto', options);
const notesProto = grpc.loadPackageDefinition(packageDefinition);

export const server = new grpc.Server();
server.addService(notesProto.user.User.service, {
  getUserInfo: async (call, callback) => {
    const data = await getUserInfo(call, callback);
    callback(null, data);
  },
  getStoreInfo: async (call, callback) => {
    const data = await getStoreInfo(call, callback);
    callback(null, data);
  },
  addCategoryToStore: async (call, callback) => {
    const data = await addCategoryToStoreHandle(call);
    callback(null, data);
  },
  getBankById: async (call, callback) => {
    const data = await getBankById(call);
    callback(null, data);
  },
  getAdminInfo: async (call, callback) => {
    const data = await getAdminInfo(call, callback);
    callback(null, data);
  },
  getStaffInfo: async (call, callback) => {
    const data = await getStaffInfo(call, callback);
    callback(null, data);
  },
  getUserInfoByRefer: async (call, callback) => {
    const data = await getUserInfoByRefer(call, callback);
    callback(null, data);
  },
  updateCategoryStore: async (call, callback) => {
    const data = await updateCategoryStore(call, callback);
    callback(null, data);
  },
  getListUserInfo: async (call, callback) => {
    const data = await getListUserInfo(call, callback);
    const result = [];
    data.forEach((userInfo) => {
      result.push({
        _id: userInfo._id,
        fullName: userInfo.fullName,
        phone: userInfo.phone,
        avatar: JSON.stringify(userInfo.avatar),
        online: userInfo.online,
        refer: userInfo.refer,
        code: userInfo.code
      });
    });
    callback(null, { listUsers: result });
  },
  getUserInfoByCode: async (call, callback) => {
    const data = await getUserInfoByCode(call, callback);
    callback(null, data);
  },
  ratingStoreByStar: async (call, callback) => {
    const data = await updateRatingStore(call, callback);
    callback(null, data);
  },
  getListUserInfoByArray: async (call, callback) => {
    const data = await getListUserInfoByArray(call);
    callback(null, { listUsers: data });
  },
  updateTotalProductStore: async (call, callback) => {
    const data = await updateTotalProductStore(call);
    callback(null, data);
  },
  getUserInfoByAdmin: async (call, callback) => {
    const data = await getUserInfoByAdmin(call, callback);
    callback(null, data);
  },
  getStoreInfoByAdmin: async (call, callback) => {
    const data = await getStoreInfoByAdmin(call, callback);
    callback(null, data);
  },
  getWishListByArrayProduct: async (call, callback) => {
    const data = await getWishListByArrayProduct(call, callback);
    callback(null, { item: data });
  },
  getUserByIdStore: async (call, callback) => {
    const data = await getUserByIdStore(call, callback);
    callback(null, data);
  },
  updateRatingSim: async (call, callback) => {
    callback(null, await updateRatingSimHandle(call));
  },
  updatePaymentLimitFromOrder: async (call, callback) => {
    callback(null, await updatePaymentLimitFromOrderHandle(call));
  },
  updateNewCodeUser: async (call, callback) => {
    callback(null, await updateNewCodeUserHandle(call));
  },
  updatePaymentLimitStaff: async (call, callback) => {
    callback(null, await updatePaymentLimitStaffHandle(call));
  },
  getStoreInfoByCode: async (call, callback) => {
    callback(null, await getStoreInfoByCodeHandle(call));
  }
});

server.bind(`0.0.0.0:${host[1]}`, grpc.ServerCredentials.createInsecure());

logger.info(`GRPC User Running: 0.0.0.0:${host[1]}`);
server.start();
