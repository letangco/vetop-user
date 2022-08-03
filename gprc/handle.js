import { findOneUserByCondDAO, getUserById, getListUser, getListUserInfoByArrayDAO, getUserByStore } from '../server/components/user/user.dao';
import { getStoreByCond, getStoreById, getStoreByUser } from '../server/components/store/store.dao';
import { getAdminById } from '../server/components/admin/admin.dao';
import { findOneStaff, findStaffByCond } from '../server/components/staff/staff.dao';
import { getCountryById } from '../server/components/country/country.dao';
import { getStateById } from '../server/components/state/state.dao';
import { GetFileData } from '../external/util/file';
import { SHARE_HOST, DEFAULT_AVATAR, TYPE_LOGIN } from '../external/constants/constants';
import { findOneBankList } from '../server/components/bankInfo/bankList.dao';
import { findOneBankInfo } from '../server/components/bankInfo/bankInfo.dao';
import { updateNewCodeUserService } from '../server/components/user/user.service';

// getUserInfo
export async function getUserInfo(call) {
  try {
    const request = call.request;
    const promise = await Promise.all([
      getUserById(request.id),
      getStoreByUser(request.id)
    ]);
    const user = promise[0];
    const store = promise[1];
    return {
      _id: user?._id,
      fullName: user?.fullName,
      phone: user?.phone,
      avatar: user?.avatar ? JSON.stringify(user.avatar) : '',
      online: user?.online,
      refer: user?.refer,
      code: user?.code,
      address: user?.address || '',
      store: store?._id || '',
      ratingSim: user?.ratingSim || 0
    };
  } catch (err) {
    return false;
  }
}

// getStoreInfo
export async function getStoreInfo(call) {
  try {
    const request = call.request;
    const store = await getStoreById(request.id);
    return {
      _id: store?._id,
      code: store?.code,
      name: store?.name,
      description: store?.description,
      address: store?.address,
      phone: store?.phone,
      userId: store?.userId,
      avatar: JSON.stringify(store?.avatar),
      ratingSim: store?.ratingSim || 0
    };
  } catch (err) {
    return false;
  }
}

// get AdminInfo
export async function getAdminInfo(call) {
  try {
    const request = call.request;
    const admin = await getAdminById(request.id);
    return {
      _id: admin._id,
      fullName: admin.fullName,
      userName: admin.userName,
      email: admin.email,
    };
  } catch (error) {
    return false;
  }
}

// get staff info
export async function getStaffInfo(call) {
  try {
    const request = call.request;
    const staffInfo = await findOneStaff({ _id: request.id });
    return {
      _id: staffInfo._id,
      userId: staffInfo.userId,
      storeId: staffInfo.storeId,
      paymentLimit: staffInfo.paymentLimit
    }
  } catch (error) {
    return false;
  }
}

export async function addCategoryToStoreHandle(call) {
  try {
    const request = call.request;
    const store = await getStoreById(request.id);
    store.storeCategories = JSON.parse(request.listCate);
    await store.save();
    return true;
  } catch (error) {
    return false;
  }
}

export async function getUserInfoByRefer(call) {
  try {
    const request = call.request;
    const userInfo = await findOneUserByCondDAO({ refer: request.refer });
    return {
      _id: userInfo._id,
      fullName: userInfo.fullName,
      phone: userInfo.phone,
      avatar: JSON.stringify(userInfo.avatar),
      online: userInfo.online,
      refer: userInfo.refer,
      code: userInfo.code
    }
  } catch (error) {
    return false;
  }
}

export async function updateCategoryStore(call) {
  try {
    const request = call.request;
    const store = await getStoreById(request.storeId);
    store.storeCategories = JSON.parse(request.categoriesId);
    await store.save();
    await store.UpdateStoreToElasticSearch();
    return {
      success: 'success'
    };
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getListUserInfo(call) {
  try {
    const request = call.request;
    return await getListUser(request.users);
  } catch (error) {
    return false;
  }
}
export async function getUserInfoByCode(call) {
  try {
    const request = call.request;
    const userInfo = await findOneUserByCondDAO({ code: request.code });
    return {
      _id: userInfo._id,
      fullName: userInfo.fullName,
      phone: userInfo.phone,
      avatar: JSON.stringify(userInfo.avatar),
      online: userInfo.online,
      refer: userInfo.refer,
      code: userInfo.code
    }
  } catch (error) {
    return false;
  }
}

export async function updateRatingStore(call) {
  try {
    const request = call.request;
    const store = await getStoreById(request._id);
    store.rate = request.star;
    await store.save();
    return {
      success: 'success'
    }
  } catch (error) {
    return false;
  }
}

export async function getListUserInfoByArray(call) {
  try {
    const request = call.request;
    const ids = JSON.parse(request.idUsers);
    const userInfo = await getListUserInfoByArrayDAO(ids)
    const payload = userInfo.map((p) => {
      return {
        _id: p._id,
        fullName: p.fullName,
        phone: p.phone,
        avatar: JSON.stringify(p.avatar),
        online: p.online,
        refer: p.refer,
        code: p.code
      }
    })
    return payload;
  } catch (error) {
    return false;
  }
}

export async function updateTotalProductStore(call) {
  try {
    const request = call.request;
    const store = await getStoreById(request.storeId);
    if (!store) return false;
    store.totalProduct = request.totalProduct;
    await Promise.all([store.save(), store.UpdateStoreToElasticSearch()]);
    return {
      success: 'success'
    };
  } catch (error) {
    return false;
  }
}

export async function getUserInfoByAdmin(call) {
  try {
    const request = call.request;
    const user = await getUserById(request.id);
    return {
      _id: user?._id,
      code: user?.code,
      email: user?.email,
      fullName: user?.fullName,
      phone: user?.phone,
      address: user?.address,
      status: user?.status,
      rate: user?.rate,
      identity: user?.identity,
      gender: user?.gender,
      dob: user?.dob,
      qrCode: user?.qrCode,
      avatar: user?.avatar ? GetFileData(SHARE_HOST, user.avatar) : GetFileData(SHARE_HOST, DEFAULT_AVATAR),
      online: user?.online,
      createdAt: new Date(user?.createdAt).toISOString(),
    };
  } catch (err) {
    return false;
  }
}

export async function getStoreInfoByAdmin(call) {
  try {
    const request = call.request;
    const store = await getStoreById(request.id);
    const country = await getCountryById(store.countryId);
    const hasState = await getStateById(store.stateId);
    return {
      _id: store?._id,
      code: store?.code,
      name: store?.name,
      description: store?.description,
      address: store?.address,
      phone: store?.phone,
      status: store?.status,
      avatar: store?.avatar ? GetFileData(SHARE_HOST, store.avatar) : {},
      rate: store?.rate,
      totalProduct: store?.totalProduct,
      online: store?.online,
      createdAt: store?.createdAt ? new Date(store?.createdAt).toISOString() : '',
      loc: store?.loc,
      storeCategories: store?.storeCategories,
      countryId: country || {},
      stateId: hasState || {},
      company: store?.company,
    };
  } catch (error) {
    return false;
  }
}

export async function getBankById(call) {
  try {
    const request = call.request;
    const bankInfo = await findOneBankInfo({ _id: request.bankInfoId });
    if (!bankInfo) return false;
    const bank = await findOneBankList({ _id: bankInfo.bankId });
    if (!bank) return false;
    return {
      _id: bankInfo._id,
      name: bank.name,
      bankCode: bank.bankCode,
      bankBranch: bankInfo.bankBranch,
      ownerName: bankInfo.ownerName,
      accountNumber: bankInfo.accountNumber
    };
  } catch (error) {
    return false;
  }
}

export async function getUserByIdStore(call) {
  try {
    const request = call.request;
    const userInfo = await getUserByStore(request.storeId);
    if (!userInfo) return false;
    return {
      _id: userInfo._id,
      code: userInfo.code,
      email: userInfo.email,
      phone: userInfo.phone,
      fullName: userInfo.fullName,
      address: userInfo.address,
      status: userInfo.status,
      rate: userInfo.rate,
      identity: userInfo.identity,
      gender: userInfo.gender,
      dob: userInfo.dob,
      avatar: GetFileData(SHARE_HOST, userInfo.avatar),
      createdAt: userInfo.createdAt
    };
  } catch (error) {
    return false;
  }
}

export async function updateRatingSimHandle(call) {
  try {
    const request = call.request;
    let profile;
    if (request.type === TYPE_LOGIN.USER) {
      profile = await findOneUserByCondDAO({ _id: request._id });
    } else {
      profile = await getStoreById(request._id);
    }
    profile.ratingSim = request.rating;
    await profile.save();
    return {
      success: true
    }
  } catch (error) {
    return false;
  }
}

export async function updatePaymentLimitFromOrderHandle(call) {
  try {
    const request = call.request;
    const staffInfo = await findOneStaff({ storeId: request.storeId, _id: request.staffId });
    await staffInfo.update({ $inc: { paymentLimit: -request.paymentLimit }});
    return {
      success: true
    };
  } catch (error) {
    return false;
  }
}

export async function updateNewCodeUserHandle(call) {
  try {
    const request = call.request;
    await updateNewCodeUserService(request.user, request.code);
    return {
      success: true
    }
  } catch (error) {
    return false;
  }
}

export async function updatePaymentLimitStaffHandle(call) {
  try {
    const request = call.request;
    // let staff = await findStaffByCond({ _id: request.staffId });
    const staff = await findOneStaff({ _id: request.staffId });
    console.log('paymentStaff: ', staff, request.value);
    // staff.paymentLimit -= parseInt(request.value);
    const payment = parseInt(staff.paymentLimit) - parseInt(request.value);
    console.log(parseInt(staff.paymentLimit), parseInt(request.value), parseInt(payment));
    await staff.updateOne({
      $set: { paymentLimit: parseInt(payment) }
    });
    // await staff.save();
    return {
      success: true
    };
  } catch (error) {
    return false;
  }
}

export async function getStoreInfoByCodeHandle(call) {
  try {
    const request = call.request;
    const payload = await getStoreByCond({ code: request.code})
    return {
      _id: payload._id,
      name: payload.name,
      phone: payload.phone,
      avatar: JSON.stringify(payload.avatar),
      online: payload.online,
      code: payload.code,
      address: payload.address,
      userId: payload.userId,
    }
  } catch (error) {
    return false;
  }
}
