/* eslint-disable new-cap */
import { clientStore } from './client';
import { CallGrpc } from '../../../external/grpc/lib/call';

export async function GetClassByIdTeacher(id, lng, lat) {
  try {
    return await CallGrpc(clientStore, 'GetClassBiIdTeacher', { id, lng, lat })
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function getOrderClassOfUser(id) {
  try {
    return await CallGrpc(clientStore, 'GetAllOrderClassOfUser', { id })
  } catch (error) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function getCategoriesByIdStore(id, query, sort) {
  try {
    return await CallGrpc(clientStore, 'getCategoryByStoreId', { id, query, sort })
  } catch (error) {
    return false;
  }
}

export async function getCategories() {
  try {
    return await CallGrpc(clientStore, 'getCategories', {})
  } catch (error) {
    return false;
  }
}

export async function getCommentRatingByIdStore(_id, type) {
  try {
    return await CallGrpc(clientStore, 'getCommentRatingByIdStore', { _id, type });
  } catch (error) {
    return false;
  }
}

export async function getCategoriesInfo(id) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientStore, 'getCategoriesInfo', { id });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function getProductsToStore(_id) {
  try {
    return await CallGrpc(clientStore, 'getProductsToStore', { _id })
  } catch (error) {
    return false;
  }
}

export async function getRatingGRPC(targetId, type, limit, skip, sort) {
  try {
    return await CallGrpc(clientStore, 'getRating', { targetId, type, limit, skip, sort });
  } catch (error) {
    return false;
  }
}

export async function getTotalProduct(storeId) {
  try {
    return await CallGrpc(clientStore, 'countTotalProduct', { storeId });
  } catch (error) {
    return false;
  }
}

export async function getCategoriesInArray(categories) {
  try {
    return await CallGrpc(clientStore, 'getCategoriesInArray', { categories });
  } catch (error) {
    return false;
  }
}

export async function getProductByStoreCategoriesByAdmin(idCategories, idStore) {
  try {
    return await CallGrpc(clientStore, 'getProductByStoreCategoriesByAdmin', { idCategories, idStore });
  } catch (error) {
    return false;
  }
}

export async function getCategoriesStoreByAdmin(id) {
  try {
    return await CallGrpc(clientStore, 'getCategoriesStoreByAdmin', { id });
  } catch (error) {
    return false;
  }
}

export async function createSimAcc(_id, name, phone ) {
  try {
    return await CallGrpc(clientStore, 'createSimAccount', { _id, name, phone })
  } catch (error) {
    return false;
  }
}

export async function getSalesRequest(staffId) {
  try {
    return await CallGrpc(clientStore, 'getSales', { staffId });
  } catch (error) {
    return false;
  }
}

export async function createCategoriesStore(storeId, categoriesId) {
  try {
    return await CallGrpc(clientStore, 'createCategoriesStore', { storeId, categoriesId });
  } catch (error) {
    return false;
  }
}
