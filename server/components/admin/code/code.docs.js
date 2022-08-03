/**
* @swagger
* /admin/type-code/get-codes/:
*   get:
*     summary: Filter Best Code
*     tags:
*       - Admin - Best Code
*     parameters:
*      - in: query
*        name: keyword
*        type: string
*        description: text search code/ rule of best code
*      - in: query
*        name: limit
*        type: number
*        description: Specifies the maximum number of Best Code the query will return. Limit default is 10
*      - in: query
*        name: page
*        type: number
*        description: Specifies the number of Best Code page. Page default is 1
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: List Best Codes info
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/Best Code'
*           example: {
*              success: true,
*              payload: {
*                countBest Code: 1,
*                listBest Code: [
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
* /admin/type-code/get-code/{id}:
*   get:
*     tags:
*       - Admin - Best Code
*     summary: Get best code info by Id from database
*     parameters:
*       - name: "id"
*         in: "path"
*         description: id best code info
*         required: true
*     responses:
*       200:
*         description: get Best code info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: Best code info
*           example: {
*             'success': true,
*             'payload': {
*                      "_id": "5fc891212baa9445cc23e31c",
*                      "status": 3,
*                      "userId": "5fc890ca2baa9445cc23e31b",
*                      "code": "123123",
*                      "name": "Best code A",
*                      "description": "Best code A",
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
*                      "Best codeCategories": [
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
*         description: Best code not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy code này",
*                      "param": "Best code_NOT_FOUND"
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
* /admin/type-code/delete-best-code/{id}:
*   delete:
*     tags:
*       - Admin - Best Code
*     summary: Delete best code info by Id from database
*     parameters:
*       - name: "id"
*         in: "path"
*         description: id best code
*         required: true
*     responses:
*       200:
*         description: delete Best code info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: Best code info
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
*         description: Best code not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy code này",
*                      "param": "Best code_NOT_FOUND"
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
* /admin/type-code/update-status/{id}/{status}:
*   put:
*     tags:
*       - Admin - Best Code
*     summary: update status best code info by Id from database
*     parameters:
*       - name: "id"
*         in: "path"
*         description: id best code
*         required: true
*       - name: "status"
*         in: "path"
*         description: status best code true/false
*         required: true
*     responses:
*       200:
*         description: updated Best code info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: Best code info
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
*         description: Best code not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy code này",
*                      "param": "Best code_NOT_FOUND"
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
 * /admin/type-code/update-info-bestCode/{id}:
 *   put:
 *     summary: Update info best code
 *     tags:
 *       - Admin - Best Code
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id best code
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "code": 99999,
 *           "value": 99999,
 *           "rule": "this is rule of best code",
 *           "status": true
 *            }
 *     responses:
 *       200:
 *         description: The best code updated
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The best code show
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
* /admin/type-code/get-vip-codes:
*   get:
*     summary: Get VIP codes
*     tags:
*       - Admin - VIP Code
*     parameters:
*      - in: query
*        name: limit
*        type: number
*        description: Specifies the maximum number of VIP Code the query will return. Limit default is 10
*      - in: query
*        name: page
*        type: number
*        description: Specifies the number of VIP Code page. Page default is 1
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: List VIP Codes info
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/VIP Code'
*           example: {
*              success: true,
*              payload: {
*                countVIP Code: 1,
*                listVIP Code: [
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
* /admin/type-code/get-vip-code/{id}:
*   get:
*     tags:
*       - Admin - VIP Code
*     summary: Get VIP code info by Id from database
*     parameters:
*       - name: "id"
*         in: "path"
*         description: id VIP code info
*         required: true
*     responses:
*       200:
*         description: get VIP code info
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*             payload:
*               type: string
*               description: VIP code info
*           example: {
*             'success': true,
*             'payload': {
*                      "_id": "5fc891212baa9445cc23e31c",
*                      "status": 3,
*                      "userId": "5fc890ca2baa9445cc23e31b",
*                      "code": "123123",
*                      "name": "VIP code A",
*                      "description": "VIP code A",
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
*                      "VIP codeCategories": [
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
*         description: VIP code not found
*         schema:
*           type: string
*           example: {
*              "success": false,
*              "errors": [
*                      {
*                      "message": "Không tìm thấy code này",
*                      "param": "VIP code_NOT_FOUND"
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
 * /admin/type-code/update-value-vip-code/{id}:
 *   put:
 *     summary: Update price VIP code
 *     tags:
 *       - Admin - VIP Code
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id VIP code
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "ruleId": "606b3dc2978e1254a0e97954",
 *           "value": 99999
 *            }
 *     responses:
 *       200:
 *         description: The VIP code updated
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The VIP code show
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
* /admin/type-code/auto-code-generate/:
*   get:
*     summary: Show code auto generate Admin
*     tags:
*       - Admin - Code
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: Code info
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/Code'
*           example: {
*              success: true,
*              payload: {
*                countCode: 1,
*                listCode: [
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
 * /admin/type-code/export-temple-file-code:
 *   get:
 *     summary: Export Excel file temple code
 *     tags:
 *       - Admin - Code
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
* /admin/type-code/search-code:
*   get:
*     summary: Get list code Search
*     tags:
*       - Admin - Code
*     parameters:
*      - in: query
*        name: keyword
*        type: string
*        description: keyword to Search Code
*      - in: query
*        name: limit
*        type: number
*        description: Specifies the maximum number of Search Code the query will return. Limit default is 10
*      - in: query
*        name: page
*        type: number
*        description: Specifies the number of Search Code page. Page default is 1
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: List Search Codes info
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/Search Code'
*           example: {
*              success: true,
*              payload: {
*                countVIP Code: 1,
*                listVIP Code: [
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
* /admin/type-code/search-code/{id}:
*   delete:
*     summary: Delete code Search
*     tags:
*       - Admin - Code
*     parameters:
*      - in: path
*        name: id
*        type: string
*        description: id of Code search
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: Response delete code search
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/Search Code'
*           example: {
*              success: true,
*              payload: {
*                countVIP Code: 1,
*                listVIP Code: [
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
* /admin/type-code/search-code/{id}:
*   get:
*     summary: Get code Search info
*     tags:
*       - Admin - Code
*     parameters:
*      - in: path
*        name: id
*        type: string
*        description: id of Code search
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: Response get code search
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/Search Code'
*           example: {
*              success: true,
*              payload: {
*                countVIP Code: 1,
*                listVIP Code: [
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
* /admin/type-code/search-code:
*   delete:
*     summary: delete list code Search
*     tags:
*       - Admin - Code
*     responses:
*       200:
*         name: body
*         in: body
*         required: true
*         description: Response delete list code search
*         schema:
*           type: object
*           properties:
*             $ref: '#/definitions/Search Code'
*           example: {
*              success: true,
*              payload: {
*                countVIP Code: 1,
*                listVIP Code: [
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
