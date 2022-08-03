import { Router } from 'express';
import * as StoreController from './store.controller';
import { isAuthorized, isGuest, isOwnerStore, isStore, isUser } from '../../../internal/auth/jwt';
import * as StoreValidator from './store.validator';

const router = new Router();
// Staff router
router.route('/staff')
  .post(
    isUser.auth(),
    StoreController.createStaff
  );

router.route('/staff/invite/')
  .get(
    isUser.auth(),
    StoreController.getListStoreInvite
  )
  .put(
    isUser.auth(),
    StoreController.acceptOrRejectStoreInvice
  );


router.route('/staff')
  .get(
    isOwnerStore.auth(),
    StoreController.getStaffs
  )
  .put(
    isOwnerStore.auth(),
    StoreController.updateStaffInfo
  )

router.route('/staff/:id')
  .get(
    isUser.auth(),
    StoreController.getStaff
  );
router.route('/staff/:id')
  .delete(
    isUser.auth(),
    StoreController.deleteStaff
  );
// Location router
router.route('/location/detail/:id')
  .get(
    StoreController.getStoreLocationByStoreId
  )

router.route('/location')
  .post(
    isStore.auth(),
    StoreValidator.createStoreLocationValidator,
    StoreController.createLocation
  );
router.route('/location')
  .get(
    StoreController.getLocations
  )
  .put(
    isStore.auth(),
    StoreController.updateStoreLocation
  )

router.route('/location-default/')
  .put(
    isStore.auth(),
    StoreController.updateStoreLocationDefault
  )
router.route('/locations/:id')
  .get(
    StoreController.getLocation
  )
  .delete(
    isStore.auth(),
    StoreController.removeStoreLocation
  )
router.route('/locations-store/')
  .get(
    isStore.auth(),
    StoreController.getStoreLocationByToken
  )
// Store router
router.route('/detail/:id')
  .get(
    isAuthorized(),
    // isStore.auth(),
    StoreController.getStore
  );

router.route('/detail-store-by-qr/:code')
    .get(
      isAuthorized(),
      StoreController.getStoreDetailByCode
    );

router.route('/category/:id')
  .get(
    StoreController.getStoreCategory
  );
router.route('/')
  .post(
    isUser.auth(),
    StoreValidator.createStoreValidator,
    StoreController.createStore
  );
router.route('/')
  .put(
    isUser.auth(),
    StoreValidator.updateStoreValidator,
    StoreController.updateStore
  );

  router.route('/avatar')
  .put(
    isUser.auth(),
    StoreValidator.updateAvatar,
    StoreController.updateAvatarStore
  );

router.route('/store-category/')
  .put(
    isUser.auth(),
    StoreController.updateStoreCategories
  );

router.route('/')
  .get(
    isAuthorized(),
    StoreController.getStores
  );

router.route('/search-location')
  .get(
    StoreController.searchStoreByLocation
  );

router.route('/rating/:type/:id/')
  .get(
    StoreController.getRatingStoreProductById
  );

router.route('/search-store/')
  .get(
    StoreController.searchStore
  )

router.route('/staffInfo/payment-limit/')
  .get(
    isStore.auth(),
    StoreController.getPaymentLimitStaff
  )

export default router;
