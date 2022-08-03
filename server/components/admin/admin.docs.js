/**
 * @swagger
 * /admin/login/:
 *   post:
 *     summary: Login to your account. If your phone is not verify, push verificationCode from your email to request body
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *         example: {
 *           "email": "admin@gmail.com",
 *           "password": "admin111"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *                phone: "0123456789",
 *                fullName: "Exam Ple",
 *                avatar: {},
 *                token: "string"
 *              }
 *           }
 *       400:
 *         description: When params is missing type - user/store/staff or incorrect telephone, password
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "INVALID_TYPE_LOGIN"
 *               },
 *               {
 *                 "param": "PHONE_PASSWORD_INVALID_ERR"
 *               }
 *             ]
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": [
 *                  "PASSWORD_INVALID",
 *                  [
 *                  6
 *                  ]
 *                 ],
 *                 "param": "password",
 *                 "location": "body"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

// /**
//  * @swagger
//  * /admin/user:
//  *   get:
//  *     summary: Get all User from database
//  *     tags:
//  *       - Admin - User
//  *     parameters:
//  *      - in: query
//  *        name: keyword
//  *        type: string
//  *        description: text search
//  *      - in: query
//  *        name: limit
//  *        type: number
//  *        description: Specifies the maximum number of user the query will return. Limit default is 10
//  *      - in: query
//  *        name: page
//  *        type: number
//  *        description: Specifies the number of user page. Page default is 1
//  *     responses:
//  *       200:
//  *         name: body
//  *         in: body
//  *         required: true
//  *         description: List User info
//  *         schema:
//  *           type: object
//  *           properties:
//  *             $ref: '#/definitions/User'
//  *           example: {
//  *              success: true,
//  *              payload: {
//  *                countUser: 1,
//  *                listUser: [
//  *                  {
//  *                      "_id": "5fc49a51af171e5aa4320868",
//  *                      "avatar": {
//  *                          "name": "5f718f9d3abc89001945b625_default_1602236703381.png",
//  *                          "large": "5f718f9d3abc89001945b625_default_1602236703381.png",
//  *                          "medium": "180x180_5f718f9d3abc89001945b625_default_1602236703381.png",
//  *                          "small": "90x90_5f718f9d3abc89001945b625_default_1602236703381.png"
//  *                      },
//  *                      "status": 3,
//  *                      "rate": 0,
//  *                      "online": 0,
//  *                      "gender": 1,
//  *                      "code": 123123,
//  *                      "phone": "0123456789",
//  *                      "fullName": "Exam Ple",
//  *                      "email": "example@gmail.com",
//  *                      "refer": "5f769e48a2ac2708288b3167",
//  *                      "createdAt": "2020-11-30T07:08:01.109Z",
//  *                      "updatedAt": "2020-12-01T03:07:10.973Z",
//  *                      "__v": 0
//  *                  }
//  *                ]
//  *              }
//  *           }
//  *       401:
//  *         description: Unauthorized
//  *         schema:
//  *           type: array
//  *           items:
//  *             type: object
//  *             properties:
//  *               $ref: '#/definitions/ValidatorErrorItem'
//  *           example: {
//  *             success: false,
//  *             errors: [
//  *               {
//  *                 "param": "UNAUTHORIZED"
//  *               }
//  *             ]
//  *           }
//  *       500:
//  *         description: When got server exception
//  *         schema:
//  *           type: string
//  *           example: "Internal server error"
//  */

/**
* @swagger
* /admin/user/{id}:
*   get:
*     tags:
*       - Admin - User
*     summary: Get user info by Id from database
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of user that needs to be get user info"
*         required: true
*     responses:
*       200:
*         description: get user info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: user info
*           example: {
*             'success': true,
*             'payload': []
*           }
*       404:
*         description: User not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy người dùng này.",
*                      "param": "USER_NOT_FOUND"
*                      }
*                  ]
*              }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/

/**
 * @swagger
 * /admin/user-refer/:
 *   get:
 *     summary: Get users have linked from database
 *     tags:
 *       - Admin - User
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search fullName or email user
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of user the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of user page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: List users have linked info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *                countUser: 1,
 *                listUser: [
 *                  {
 *                      "_id": "5fc49a51af171e5aa4320868",
 *                      "avatar": {
 *                          "name": "5f718f9d3abc89001945b625_default_1602236703381.png",
 *                          "large": "5f718f9d3abc89001945b625_default_1602236703381.png",
 *                          "medium": "180x180_5f718f9d3abc89001945b625_default_1602236703381.png",
 *                          "small": "90x90_5f718f9d3abc89001945b625_default_1602236703381.png"
 *                      },
 *                      "status": 3,
 *                      "rate": 0,
 *                      "online": 0,
 *                      "gender": 1,
 *                      "code": 123123,
 *                      "phone": "0123456789",
 *                      "fullName": "Exam Ple",
 *                      "email": "example@gmail.com",
 *                      "refer": "5f769e48a2ac2708288b3167",
 *                      "createdAt": "2020-11-30T07:08:01.109Z",
 *                      "updatedAt": "2020-12-01T03:07:10.973Z",
 *                      "__v": 0
 *                  }
 *                ]
 *              }
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
* @swagger
* /admin/user-filter/:
*   get:
*     summary: Filter user by from date to date and filter by user register with store
*     tags:
*       - Admin - User
*     parameters:
*      - in: query
*        name: keyword
*        type: string
*        description: text search fullName or email user
*      - in: query
*        name: status
*        type: number
*        description: Status user. 1. ACTIVE, 2. INACTIVE, 3. PENDING
*      - in: query
*        name: fromDay
*        type: string
*        description: fromDay ISOString
*      - in: query
*        name: toDay
*        type: string
*        description: toDay ISOString
*      - in: query
*        name: limit
*        type: number
*        description: Specifies the maximum number of user the query will return. Limit default is 10
*      - in: query
*        name: page
*        type: number
*        description: Specifies the number of user page. Page default is 1
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: List users info
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/User'
*           example: {
*              success: true,
*              payload: {
*                countUser: 1,
*                listUser: [
*                  {
*                      "_id": "5fc49a51af171e5aa4320868",
*                      "avatar": {
*                          "name": "5f718f9d3abc89001945b625_default_1602236703381.png",
*                          "large": "5f718f9d3abc89001945b625_default_1602236703381.png",
*                          "medium": "180x180_5f718f9d3abc89001945b625_default_1602236703381.png",
*                          "small": "90x90_5f718f9d3abc89001945b625_default_1602236703381.png"
*                      },
*                      "status": 3,
*                      "rate": 0,
*                      "online": 0,
*                      "gender": 1,
*                      "code": 123123,
*                      "phone": "0123456789",
*                      "fullName": "Exam Ple",
*                      "email": "example@gmail.com",
*                      "refer": "5f769e48a2ac2708288b3167",
*                      "createdAt": "2020-11-30T07:08:01.109Z",
*                      "updatedAt": "2020-12-01T03:07:10.973Z",
*                      "__v": 0
*                  }
*                ]
*              }
*           }
*       401:
*         description: Unauthorized
*         schema:
*           type: array
*           items:
*             type: object
*             properties:
*               $ref: '#/definitions/ValidatorErrorItem'
*           example: {
*             success: false,
*             errors: [
*               {
*                 "param": "UNAUTHORIZED"
*               }
*             ]
*           }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/

/**
 * @swagger
 * /admin/user-update-status/{id}/{status}:
 *   put:
 *     tags:
 *       - Admin - User
 *     summary: Update Status User By Admin
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id User
 *         required: true
 *       - name: "status"
 *         in: "path"
 *         description: 1. active, 2. inactive, 3. pending
 *         required: true
 *     responses:
 *       200:
 *         description: Update status User
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Country info
 *           example: {
 *             'success': true,
 *             'payload': true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: Not Found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy user này",
 *                      "param": "USER_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/change-type-code:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Change Type Code
 *     parameters:
 *       - name: type
 *         in: query
 *         description: "1 - 15"
 *         required: true
 *     responses:
 *       200:
 *         description: get user info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: user info
 *           example: {
 *             'success': true,
 *             'payload': []
 *           }
 *       404:
 *         description: User not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy người dùng này.",
 *                      "param": "USER_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/user-refer/:
 *   get:
 *     summary: Get Stores and filter store by search, status and day range
 *     tags:
 *       - Admin - User
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search name/email/phone/address/code of the Store
 *      - in: query
 *        name: status
 *        type: number
 *        description: Status Store. 1. ACTIVE, 2. INACTIVE, 3. PENDING
 *      - in: query
 *        name: fromDay
 *        type: string
 *        description: fromDay ISOString
 *      - in: query
 *        name: toDay
 *        type: string
 *        description: toDay ISOString
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of Store the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of Store page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: List Store have linked info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/Store'
 *           example: {
 *              "success": true,
 *              "total_page": 1,
 *              "total_item": 2,
 *              "page": 1,
 *              "item": 2,
 *              "payload": [
 *                  {
 *                      "_id": "5fc891212baa9445cc23e31c",
 *                      "status": 3,
 *                      "userId": "5fc890ca2baa9445cc23e31b",
 *                      "code": "123123",
 *                      "name": "Store A",
 *                      "description": "Store A",
 *                      "address": "Address A",
 *                      "phone": "0987654321",
 *                      "countryId": "5fc890ca2baa9445cc23e318",
 *                      "zoneId": "5fc890ca2baa9445cc23e319",
 *                      "loc": {
 *                          "type": "Point",
 *                          "coordinates": [
 *                              105.501488,
 *                              9.843626
 *                              ]
 *                          },
 *                      "__v": 1,
 *                      "storeCategories": [
 *                          "5fce071f100d28240c935134"
 *                          ]
 *                      }
 *                  ]
 *              }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
* @swagger
* /admin/store/{id}:
*   get:
*     tags:
*       - Admin - Store
*     summary: Get store info by Id from database
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of store that needs to be get Store info"
*         required: true
*     responses:
*       200:
*         description: get store info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: store info
*           example: {
*             'success': true,
*             'payload': {
*                      "_id": "5fc891212baa9445cc23e31c",
*                      "status": 3,
*                      "userId": "5fc890ca2baa9445cc23e31b",
*                      "code": "123123",
*                      "name": "Store A",
*                      "description": "Store A",
*                      "address": "Address A",
*                      "phone": "0987654321",
*                      "countryId": "5fc890ca2baa9445cc23e318",
*                      "zoneId": "5fc890ca2baa9445cc23e319",
*                      "loc": {
*                          "type": "Point",
*                          "coordinates": [
*                              105.501488,
*                              9.843626
*                              ]
*                          },
*                      "__v": 1,
*                      "storeCategories": [
*                          "5fce071f100d28240c935134"
*                          ]
*                      }
*           }
*       401:
*         description: Unauthorized
*         schema:
*           type: array
*           items:
*             type: object
*             properties:
*               $ref: '#/definitions/ValidatorErrorItem'
*           example: {
*             success: false,
*             errors: [
*               {
*                 "param": "UNAUTHORIZED"
*               }
*             ]
*           }
*       404:
*         description: store not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy cửa hàng này.",
*                      "param": "STORE_NOT_FOUND"
*                      }
*                  ]
*              }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/

/**
* @swagger
* /admin/store/get-staffs/{id}:
*   get:
*     tags:
*       - Admin - Store
*     summary: Get staff of a store
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of store that needs to be get staff info"
*         required: true
*       - name: limit
*         in: query
*         type: number
*         description: Specifies the maximum number of staffs the query will return. Limit default is 10
*       - name: page
*         in: query
*         type: number
*         description: Specifies the number of staffs page. Page default is 1
*     responses:
*       200:
*         description: list Staff info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: Staffs info
*           example: {
*             'success': true,
*             'payload': {
*                      "_id": "5fc891212baa9445cc23e31c",
*                      "status": 3,
*                      "userId": "5fc890ca2baa9445cc23e31b",
*                      "code": "123123",
*                      "name": "Store A",
*                      "description": "Store A",
*                      "address": "Address A",
*                      "phone": "0987654321",
*                      "countryId": "5fc890ca2baa9445cc23e318",
*                      "zoneId": "5fc890ca2baa9445cc23e319",
*                      "loc": {
*                          "type": "Point",
*                          "coordinates": [
*                              105.501488,
*                              9.843626
*                              ]
*                          },
*                      "__v": 1,
*                      "storeCategories": [
*                          "5fce071f100d28240c935134"
*                          ]
*                      }
*           }
*       401:
*         description: Unauthorized
*         schema:
*           type: array
*           items:
*             type: object
*             properties:
*               $ref: '#/definitions/ValidatorErrorItem'
*           example: {
*             success: false,
*             errors: [
*               {
*                 "param": "UNAUTHORIZED"
*               }
*             ]
*           }
*       404:
*         description: store not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy cửa hàng này.",
*                      "param": "STORE_NOT_FOUND"
*                      }
*                  ]
*              }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/

/**
 * @swagger
 * /admin/store-filter/:
 *   get:
 *     summary: Get Stores and filter store by search, status and day range
 *     tags:
 *       - Admin - Store
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search name/email/phone/address/code of the Store
 *      - in: query
 *        name: status
 *        type: string
 *        description: Status Store. 1. ACTIVE, 2. INACTIVE, 3. PENDING
 *      - in: query
 *        name: fromDay
 *        type: string
 *        description: fromDay ISOString
 *      - in: query
 *        name: toDay
 *        type: string
 *        description: toDay ISOString
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of Store the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of Store page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: List Store have linked info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/Store'
 *           example: {
 *              "success": true,
 *              "total_page": 1,
 *              "total_item": 2,
 *              "page": 1,
 *              "item": 2,
 *              "payload": [
 *                  {
 *                      "_id": "5fc891212baa9445cc23e31c",
 *                      "status": 3,
 *                      "userId": "5fc890ca2baa9445cc23e31b",
 *                      "code": "123123",
 *                      "name": "Store A",
 *                      "description": "Store A",
 *                      "address": "Address A",
 *                      "phone": "0987654321",
 *                      "countryId": "5fc890ca2baa9445cc23e318",
 *                      "zoneId": "5fc890ca2baa9445cc23e319",
 *                      "loc": {
 *                          "type": "Point",
 *                          "coordinates": [
 *                              105.501488,
 *                              9.843626
 *                              ]
 *                          },
 *                      "__v": 1,
 *                      "storeCategories": [
 *                          "5fce071f100d28240c935134"
 *                          ]
 *                      }
 *                  ]
 *              }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/slideshow:
 *   post:
 *     summary: Create Slide show by admin
 *     tags:
 *       - Admin - Slideshow
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           categoryId:
 *             type: string
 *         example: {
 *           "image":
 *                      {
 *                          "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                      },
 *                      "title": "Giới thiệu ID mới nhận ngay 500.000 VTĐ. Hơn thế nữa là được nhận hoa",
 *              }
 *     responses:
 *       200:
 *         description: The Slide uploaded
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The slide show
 *           example: {
 *             'success': true,
 *             "payload": {
 *                           "id": "5f8cf9331222c53e74d6626d",
 *                           "title": "Tin tức được xem nhiều nhất",
 *                           "image":
 *                              {
 *                                  "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                                  "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                                  "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                                  "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              }
 *                         }
 *                  }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }

 *       500:
 *         description: When got server exception
 */

/**
 * @swagger
 * /admin/slideshow/{id}:
 *   put:
 *     tags:
 *       - Admin - Slideshow
 *     summary: Update Slide show children by Admin
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id slide
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           title:
 *             type: string
 *           image:
 *             type: Object
 *         example: {
 *           "title": "A Privacy Policy is a Legal Requirement",
 *           "image":
 *                    {
 *                       "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                       "large": "https://vetop-upload-dev.tesse.io/lg/5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                       "medium": "https://vetop-upload-dev.tesse.io/md/85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                       "small": "https://vetop-upload-dev.tesse.io/sm/43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                    },
 *         }
 *     responses:
 *       200:
 *         description: Update a slide
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Country info
 *           example: {
 *             'success': true,
 *             'payload': [{
 *                   "_id": "5fdc4fd1ff59a80e3439dfc6",
 *                   "title": "A Privacy Policy is a Legal Requirement",
 *                   "content": "Our Privacy Policy generator is compliant with all of the major laws",
 *                   "__v": 0
 *              }]
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: slide
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy slide này",
 *                      "param": "SLIDE_SHOW_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/slideshow/{id}:
 *   delete:
 *     summary: Delete slide show by id
 *     tags:
 *       - Admin - Slideshow
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the slide show that needs to be delete"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your slide info
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: Slide not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy slide này.",
 *                      "param": "SLIDE_SHOW_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/slideshow/{id}:
 *   get:
 *     summary: Get info Slide show by Admin
 *     tags:
 *       - Admin - Slideshow
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id Slide
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your slide info
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': [{
 *                   "_id": "5fdc4fd1ff59a80e3439dfc6",
 *                   "status": true,
 *                   "title": "A Privacy Policy is a Legal Requirement",
 *                   "content": "Our Privacy Policy generator is compliant with all of the major laws",
 *                   "__v": 0
 *              }]
 *           }
 *       404:
 *         description: Slide not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy slide này",
 *                      "param": "SLIDE_SHOW_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/slideshow/:
 *   get:
 *     summary: Get list slide by Admin
 *     tags:
 *       - Admin - Slideshow
 *     parameters:
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of Slide the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of Slide page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: List Slide show
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/Slideshow'
 *           example: {
 *              "success": true,
 *              "payload": []
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
* @swagger
* /admin/slideshow-sort:
*   put:
*     tags:
*       - Admin - Slideshow
*     summary: Sort Slideshow by Admin
*     parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        properties:
 *           slides:
 *             type: object
 *        example: {
 *           "slides": [
 *                  {"_id": "5fe8d52c2de8cb0834210a81"},
 *                  {"_id": "5fd491150ad51609786fb185"}
 *              ]
 *         }
*     responses:
*       200:
*         description: get user info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: user info
*           example: {
*             'success': true,
*             'payload': []
*           }
*       404:
*         description: User not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy người dùng này.",
*                      "param": "USER_NOT_FOUND"
*                      }
*                  ]
*              }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/

/**
 * @swagger
 * /admin/news/:
 *   post:
 *     tags:
 *       - Admin - News
 *     summary: Create a News by Admin
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           categoryId:
 *             type: string
 *         example: {
 *           "images": [
 *                      {
 *                          "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                      },
 *                      {
 *                          "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                      }
 *                     ],
 *                      "title": "Giới thiệu ID mới nhận ngay 500.000 VTĐ. Hơn thế nữa là được nhận hoa",
 *                      "description": "Tin tức được xem nhiều nhất",
 *                      "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
 *                      "categories": ["5fdb98e78e7c6a315ceac9c6", "5fdb98e78e7c6a315ceac9d0"],
 *                      "tags": ["Điện thoại", "Điện tử"],
 *                      "author": "Nguyuyễn Trong Nghĩa"
 *              }
 *     responses:
 *       200:
 *         description: News has created
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: News info
 *           example: {
 *             'success': true,
 *             'payload': {
 *                  "images": [
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              },
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              }
 *                          ],
 *                  "title": "Giới thiệu ID mới nhận ngay 500.000 VTĐ. Hơn thế nữa là được nhận hoa",
 *                  "meta_description": "",
 *                  "description": "Tin tức được xem nhiều nhất",
 *                  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
 *                  "author": "Nguyuyễn Trong Nghĩa",
 *                  "categories": [
 *                      "5fdb98e78e7c6a315ceac9c6",
 *                      "5fdb98e78e7c6a315ceac9d0"
 *                  ],
 *                  "tags": [
 *                      "Điện thoại",
 *                      "Điện tử"
 *                  ],
 *                  "status": true,
 *                  "special_news": false,
 *                  "_id": "5fdc937c9c01645be4be07e3",
 *                  "avatar": {
 *                      "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                  },
 *                  "adminId": "5fc890ca2baa9445cc23e31a",
 *                  "createdAt": "2020-12-18T11:33:16.682Z",
 *                  "updatedAt": "2020-12-18T11:33:16.682Z",
 *              "__v": 0
 *              }
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/news/{id}:
 *   delete:
 *     summary: Delete a News by Admin
 *     tags:
 *       - Admin - News
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id of News need delete by Admin
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Details News
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: News not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy tin tức này!",
 *                      "param": "NOT_FOUND_ERR"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/news/{id}:
 *   put:
 *     tags:
 *       - Admin - News
 *     summary: Update all field a News by Admin
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id News
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           title:
 *             type: string
 *           content:
 *             type: string
 *         example: {
 *                  "images": [
 *                      {
 *                          "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                      },
 *                      {
 *                          "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                          "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                      }
 *                     ],
 *                   "title": "Giới thiệu ID mới nhận ngay 500.000 VTĐ. Hơn thế nữa là được nhận hoa",
 *                   "description": "Tin tức được xem nhiều nhất",
 *                   "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
 *                   "categories": ["5fdb98e78e7c6a315ceac9c6", "5fdb98e78e7c6a315ceac9d0"],
 *                   "tags": ["Điện thoại", "Điện tử"],
 *                   "author": "Nguyuyễn Trong Nghĩa"
 *          }
 *     responses:
 *       200:
 *         description: Update a term and policy
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Country info
 *           example: {
 *             'success': true,
 *             'payload': {
 *                  "images": [
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              },
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              }
 *                          ],
 *                  "title": "Giới thiệu ID mới nhận ngay 500.000 VTĐ. Hơn thế nữa là được nhận hoa",
 *                  "meta_description": "",
 *                  "description": "Tin tức được xem nhiều nhất",
 *                  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
 *                  "author": "Nguyuyễn Trong Nghĩa",
 *                  "categories": [
 *                      "5fdb98e78e7c6a315ceac9c6",
 *                      "5fdb98e78e7c6a315ceac9d0"
 *                  ],
 *                  "tags": [
 *                      "Điện thoại",
 *                      "Điện tử"
 *                  ],
 *                  "status": true,
 *                  "special_news": false,
 *                  "_id": "5fdc937c9c01645be4be07e3",
 *                  "avatar": {
 *                      "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                  },
 *                  "adminId": "5fc890ca2baa9445cc23e31a",
 *                  "createdAt": "2020-12-18T11:33:16.682Z",
 *                  "updatedAt": "2020-12-18T11:33:16.682Z",
 *              "__v": 0
 *              }
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: News not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy tin tức này",
 *                      "param": "NOT_FOUND_ERR"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/news/special-news/{id}:
 *   put:
 *     summary: Select the first News to display by Admin
 *     tags:
 *       - Admin - News
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id of News
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Details News selected to show header dashboard
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': {
 *                  "images": [
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              },
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              }
 *                          ],
 *                  "title": "Giới thiệu ID mới nhận ngay 500.000 VTĐ. Hơn thế nữa là được nhận hoa",
 *                  "meta_description": "",
 *                  "description": "Tin tức được xem nhiều nhất",
 *                  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
 *                  "author": "Nguyuyễn Trong Nghĩa",
 *                  "categories": [
 *                      "5fdb98e78e7c6a315ceac9c6",
 *                      "5fdb98e78e7c6a315ceac9d0"
 *                  ],
 *                  "tags": [
 *                      "Điện thoại",
 *                      "Điện tử"
 *                  ],
 *                  "status": true,
 *                  "special_news": false,
 *                  "_id": "5fdc937c9c01645be4be07e3",
 *                  "avatar": {
 *                      "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                  },
 *                  "createdAt": "2020-12-18T11:33:16.682Z",
 *                  "updatedAt": "2020-12-18T11:33:16.682Z",
 *              "__v": 0
 *              }
 *          }
 *       404:
 *         description: News not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy tin tức này!",
 *                      "param": "NOT_FOUND_ERR"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/news/:
 *   get:
 *     summary: Get all News By Admin from database
 *     tags:
 *       - Admin - News
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of user the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of user page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: List News info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/News'
 *           example: {
 *              success: true,
 *              total_page: 1,
 *              total_item: 4,
 *              page: 1,
 *              item: 4,
 *              payload: []
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/news/{id}:
 *   get:
 *     summary: Get info News by admin
 *     tags:
 *       - Admin - News
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id of News
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Details News
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': {
 *                  "images": [
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              },
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              }
 *                          ],
 *                  "title": "Giới thiệu ID mới nhận ngay 500.000 VTĐ. Hơn thế nữa là được nhận hoa",
 *                  "meta_description": "",
 *                  "description": "Tin tức được xem nhiều nhất",
 *                  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
 *                  "author": "Nguyuyễn Trong Nghĩa",
 *                  "categories": [
 *                      "5fdb98e78e7c6a315ceac9c6",
 *                      "5fdb98e78e7c6a315ceac9d0"
 *                  ],
 *                  "tags": [
 *                      "Điện thoại",
 *                      "Điện tử"
 *                  ],
 *                  "status": true,
 *                  "special_news": false,
 *                  "_id": "5fdc937c9c01645be4be07e3",
 *                  "avatar": {
 *                      "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                  },
 *                  "adminId": "5fc890ca2baa9445cc23e31a",
 *                  "createdAt": "2020-12-18T11:33:16.682Z",
 *                  "updatedAt": "2020-12-18T11:33:16.682Z",
 *              "__v": 0
 *              }
 *          }
 *       404:
 *         description: News not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy tin tức này!",
 *                      "param": "NOT_FOUND_ERR"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/news/special-news/news:
 *   get:
 *     summary: Get special News from database by Admin
 *     tags:
 *       - Admin - News
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Special News info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/News'
 *           example: {
 *              success: true,
 *              total_page: 1,
 *              total_item: 4,
 *              page: 1,
 *              item: 4,
 *              payload: []
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/get-info:
 *   get:
 *     summary: Get info admin by header
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/Admin'
 *           example: {
 *              success: true,
 *              payload: {
 *               role: null,
 *               status: 3,
 *               _id: 5f4dc671b4f8b12e98f3e700,
 *               username: exapmle,
 *               email: example@mail.com,
 *               fullName: example,
 *             }
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/store-update-status/{id}/{status}:
 *   put:
 *     tags:
 *       - Admin - Store
 *     summary: Update Status Store By Admin
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id Store
 *         required: true
 *       - name: "status"
 *         in: "path"
 *         description: 1. active, 2. inactive, 3. pending
 *         required: true
 *     responses:
 *       200:
 *         description: Update status Store
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Store updated
 *           example: {
 *             'success': true,
 *             'payload': true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: Not Found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy Store này",
 *                      "param": "STORE_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/link-create:
 *   post:
 *     summary: Create a Link by Admin
 *     tags:
 *       - Admin - Link
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           categoryId:
 *             type: string
 *         example: {
 *           "icon":
 *                      {
 *                          "name": "5fc890ca2baa9445cc23e31a_12_1609145666248.png",
 *                          "large": "5fc890ca2baa9445cc23e31a_12_1609145666248.png",
 *                          "medium": "200x197_5fc890ca2baa9445cc23e31a_12_1609145666248.png",
 *                          "small": "100x98_5fc890ca2baa9445cc23e31a_12_1609145666248.png"
 *                      },
 *            "title": "Cộng đồng Vetop trên Facebook",
 *            "link": "https://www.facebook.com/search/top/?q=c%E1%BB%99ng%20%C4%91%E1%BB%93ng%20vetop",
 *              }
 *     responses:
 *       200:
 *         description: The Linked uploaded
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The Linked show
 *           example: {
 *             'success': true,
 *             "payload": {}
 *                  }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }

 *       500:
 *         description: When got server exception
 */

/**
 * @swagger
 * /admin/link-delete/{id}:
 *   delete:
 *     summary: Delete list link by id
 *     tags:
 *       - Admin - Link
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the linked that needs to be delete"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Result delete link
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: link not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy link này.",
 *                      "param": "ERR_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/link-update/{id}:
 *   put:
 *     tags:
 *       - Admin - Link
 *     summary: Update a list linked by Admin
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id link
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           title:
 *             type: string
 *           link:
 *             type: string
 *           icon:
 *             type: Object
 *         example: {
 *           "link": "https://trello.com/b/6DlOC4Do/vetop-phase-1",
 *           "title": "A Privacy Policy is a Legal Requirement",
 *           "icon":
 *                    {
 *                       "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                       "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                       "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                       "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                    },
 *         }
 *     responses:
 *       200:
 *         description: Update a linked
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: link info
 *           example: {
 *             'success': true,
 *             'payload': true
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: link not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy link này",
 *                      "param": "ERR_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
* @swagger
* /admin/link-sort:
*   put:
*     tags:
*       - Admin - Link
*     summary: Sort list Link by Admin
*     parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        properties:
 *           products:
 *             type: object
 *        example: {
 *           "links": [
 *                  {"_id": "5fe8d52c2de8cb0834210a81"},
 *                  {"_id": "5fd491150ad51609786fb185"}
 *              ]
 *         }
*     responses:
*       200:
*         description: get list link info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: list link info
*           example: {
*             'success': true,
*             'payload': []
*           }
*       404:
*         description: link not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy link này.",
*                      "param": "ERR_NOT_FOUND"
*                      }
*                  ]
*              }
*       500:
*         description: When got server exception
*         schema:
*           type: string
*           example: "Internal server error"
*/

/**
 * @swagger
 * /admin/link-info/{id}:
 *   get:
 *     summary: get info link by id
 *     tags:
 *       - Admin - Link
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the linked that needs get info"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Result info link
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": {}
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       404:
 *         description: link not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy link này.",
 *                      "param": "ERR_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/link-get-list/:
 *   get:
 *     summary: Get list linked by Admin
 *     tags:
 *       - Admin - Link
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: search title link
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of Slide the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of Slide page. Page default is 1
 *      - in: query
 *        name: sort
 *        type: string
 *        description: index:asc/desc
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: List list Link
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/Link'
 *           example: {
 *              "success": true,
 *              "payload": []
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/user-export-xlx-list:
 *   get:
 *     summary: Export Excel list User
 *     tags:
 *       - Admin - User
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search fullName or email user
 *      - in: query
 *        name: status
 *        type: number
 *        description: Status user. 1. ACTIVE, 2. INACTIVE, 3. PENDING
 *      - in: query
 *        name: fromDay
 *        type: string
 *        description: fromDay ISOString
 *      - in: query
 *        name: toDay
 *        type: string
 *        description: toDay ISOString
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Result info status user export
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": {}
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "param": "UNAUTHORIZED"
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/update-avatar:
 *   post:
 *     summary: Update avatar by admin
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           large:
 *             type: string
 *           medium:
 *             type: string
 *           small:
 *             type: string
 *         example: {
 *                   "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                   "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                   "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                   "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Info res
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': true
 *          }
 *       404:
 *         description: Admin not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy tin tức này!",
 *                      "param": "NOT_FOUND_ERR"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
