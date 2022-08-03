/**
 * @swagger
 * /stores:
 *   post:
 *     summary: create your Store
 *     tags:
 *       - Store
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           address:
 *             type: string
 *           phone:
 *             type: string
 *           countryId:
 *             type: ObjectId
 *           stateId:
 *             type: ObjectId
 *           company:
 *             type: Object
 *           categories:
 *             type: Array
 *         example: {
 *           "name": Store A,
 *           "description": Store A,
 *           "address": Address A,
 *           "loc": [105.501488, 9.843626],
 *           "phone": 0987654321,
 *           "countryId": 5fc7d01c7bcf711ad0e631ee,
 *           "stateId": 5fc7d01c7bcf711ad0e631ef,
 *           "company": {"taxCode": "2323", "founder": "qwe", "founded":"22/11/2020", "industry":"quan ao"},
 *           "email": email@gmail.com,
 *           "categories": ["5fc7d01c7bcf711ad0e631ee", "5fc7d01c7bcf711ad0e631ee"]
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
 *                  "status": 3,
 *                  "_id": "5fc752f67e22662864b4b2e4",
 *                  "userId": "5fc610c8481251194440d665",
 *                  "code": "1",
 *                  "name": "Store A",
 *                  "description": "Store A",
 *                  "address": "Address A",
 *                  "phone": "0987654321",
 *                  "countryId": "5fc7d01c7bcf711ad0e631ee",
 *                  "zoneId": "5fc7d01c7bcf711ad0e631ef",
 *                  "loc": {
 *                          "type": "Point",
 *                          "coordinates": [
 *                              105.501488,
 *                              9.843626
 *                              ]
 *                          },
 *                  "__v": 0
 *                  }
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
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'USER_NOT_FOUND'
 *             }
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
 *                 "msg": "NAME_INVALID",
 *                 "param": "name",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "DESCRIPTION_INVALID",
 *                 "param": "description",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "ADDRESS_INVALID",
 *                 "param": "address",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "COUNTRY_INVALID",
 *                 "param": "countryId",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "ZONE_INVALID",
 *                 "param": "zoneId",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "LOC_INVALID",
 *                 "param": "loc",
 *                 "location": "body"
 *               },
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
 * /stores:
 *   put:
 *     summary: update your Store
 *     tags:
 *       - Store
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           address:
 *             type: string
 *           phone:
 *             type: string
 *           countryId:
 *             type: ObjectId
 *           zoneId:
 *             type: ObjectId
 *           company:
 *             type: Object
 *           email:
 *             type: string
 *         example: {
 *           "name": Store A,
 *           "description": Store A,
 *           "address": Address A,
 *           "loc": {
 *                     "type": "Point",
 *                     "coordinates": [
 *                         105.501488,
 *                         9.843626
 *                              ]
 *                  },
 *           "phone": 0987654321,
 *           "countryId": 5fc7d01c7bcf711ad0e631ee,
 *           "zoneId": 5fc7d01c7bcf711ad0e631ef,
 *           "company": {},
 *           "email": email@gmail.com
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
 *                  "status": 3,
 *                  "_id": "5fc752f67e22662864b4b2e4",
 *                  "userId": "5fc610c8481251194440d665",
 *                  "code": "1",
 *                  "name": "Store A",
 *                  "description": "Store A",
 *                  "address": "Address A",
 *                  "phone": "0987654321",
 *                  "countryId": "5fc7d01c7bcf711ad0e631ee",
 *                  "zoneId": "5fc7d01c7bcf711ad0e631ef",
 *                  "loc": {
 *                          "type": "Point",
 *                          "coordinates": [
 *                              105.501488,
 *                              9.843626
 *                              ]
 *                          },
 *                  "__v": 0
 *                  }
 *           }
 *       400:
 *         description: User is exist
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'STORE_IS_EXIST'
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
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'STORE_NOT_FOUND'
 *             }
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
 *                 "msg": "NAME_INVALID",
 *                 "param": "name",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "DESCRIPTION_INVALID",
 *                 "param": "description",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "ADDRESS_INVALID",
 *                 "param": "address",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "COUNTRY_INVALID",
 *                 "param": "countryId",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "ZONE_INVALID",
 *                 "param": "zoneId",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "LOC_INVALID",
 *                 "param": "loc",
 *                 "location": "body"
 *               },
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
 * /stores/avatar/:
 *   put:
 *     summary: Update avatar store
 *     tags:
 *       - Store
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           storeId:
 *             type: string
 *           avatar:
 *             type: string
 *         example: {
 *           "storeId": "objectId",
 *           "image": {"name": "qweqw", "small": "asdsa", "large": "asdsad", "medium": "asdasd"}
 * }
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
 *                  "status": 3,
 *                  "_id": "5fc752f67e22662864b4b2e4",
 *                  "userId": "5fc610c8481251194440d665",
 *                  "code": "1",
 *                  "name": "Store A",
 *                  "description": "Store A",
 *                  "address": "Address A",
 *                  "phone": "0987654321",
 *                  "countryId": "5fc7d01c7bcf711ad0e631ee",
 *                  "zoneId": "5fc7d01c7bcf711ad0e631ef",
 *                  "loc": {
 *                          "type": "Point",
 *                          "coordinates": [
 *                              105.501488,
 *                              9.843626
 *                              ]
 *                          },
 *                  "__v": 0
 *                  }
 *           }
 *       400:
 *         description: User is exist
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'STORE_IS_EXIST'
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
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'STORE_NOT_FOUND'
 *             }
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
 *                 "msg": "NAME_INVALID",
 *                 "param": "name",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "DESCRIPTION_INVALID",
 *                 "param": "description",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "ADDRESS_INVALID",
 *                 "param": "address",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "COUNTRY_INVALID",
 *                 "param": "countryId",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "ZONE_INVALID",
 *                 "param": "zoneId",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "LOC_INVALID",
 *                 "param": "loc",
 *                 "location": "body"
 *               },
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
 * /stores:
 *   put:
 *     summary: update your Store
 *     tags:
 *       - Store
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           storeCategories:
 *             type: array
 *         example: {
 *           "name": []
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
 *                  "status": 3,
 *                  "_id": "5fc752f67e22662864b4b2e4",
 *                  "userId": "5fc610c8481251194440d665",
 *                  "code": "1",
 *                  "name": "Store A",
 *                  "description": "Store A",
 *                  "address": "Address A",
 *                  "phone": "0987654321",
 *                  "countryId": "5fc7d01c7bcf711ad0e631ee",
 *                  "zoneId": "5fc7d01c7bcf711ad0e631ef",
 *                  "loc": {
 *                          "type": "Point",
 *                          "coordinates": [
 *                              105.501488,
 *                              9.843626
 *                              ]
 *                          },
 *                  "__v": 0
 *                  }
 *           }
 *       400:
 *         description: User is exist
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'STORE_IS_EXIST'
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
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'STORE_NOT_FOUND'
 *             }
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
 *                 "msg": "NAME_INVALID",
 *                 "param": "name",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "DESCRIPTION_INVALID",
 *                 "param": "description",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "ADDRESS_INVALID",
 *                 "param": "address",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "COUNTRY_INVALID",
 *                 "param": "countryId",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "ZONE_INVALID",
 *                 "param": "zoneId",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": "LOC_INVALID",
 *                 "param": "loc",
 *                 "location": "body"
 *               },
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
 * /stores:
 *   get:
 *     summary: Get store list
 *     tags:
 *       - Store
 *     parameters:
 *       - name: "limit"
 *         in: "query"
 *         description: "Total items of a page."
 *       - name: "page"
 *         in: "query"
 *         description: "Page number."
 *       - name: "keyword"
 *         in: "query"
 *         description: "String search"
 *       - name: "lng"
 *         in: "query"
 *         description: "lng"
 *       - name: "lat"
 *         in: "query"
 *         description: "lat"
 *       - name: "categories"
 *         in: "query"
 *         description: "['ObjectId','ObjectId' ]"
 *       - name: "maxDistance"
 *         in: "query"
 *         description: "max distance, ex: 10000000"
 *       - name: "sort"
 *         in: "query"
 *         description: "sort by"
 *       - name: "type"
 *         in: "query"
 *         description: "all/limit"
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: stores list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/detail/{id}:
 *   get:
 *     summary: Get Store info
 *     tags:
 *       - Store
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the store"
 *         required: true
 *       - name: lng
 *         in: query
 *       - name: lat
 *         in: query
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Store info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'STORE_NOT_FOUND'
 *             }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/detail-store-by-qr/{code}:
 *   get:
 *     summary: Get Store info by code
 *     tags:
 *       - Store
 *     parameters:
 *       - name: code
 *         in: path
 *         description: "Code of the store"
 *         required: true
 *       - name: lng
 *         in: query
 *       - name: lat
 *         in: query
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Store info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'STORE_NOT_FOUND'
 *             }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/staff:
 *   post:
 *     summary: create staff of store
 *     tags:
 *       - Staff
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           userId:
 *             type: ObjectId
 *         example: {
 *           "userId": 5f6acbeb4277964af00e5cf5
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
 *              success: true
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
 *       403:
 *         description: Staff exists
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: {
 *               "param": "STAFF_EXISTS"
 *             }
 *           }
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'USER_NOT_FOUND'
 *             }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/staff/invite/:
 *   put:
 *     summary: Accept or reject staff of store
 *     tags:
 *       - Staff
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           requestId:
 *             type: ObjectId
 *           status:
 *             type: boolean
 *             description: accept/reject
 *         example: {
 *           "requestId": 5f6acbeb4277964af00e5cf5,
 *           "status": accept
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
 *              success: true
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
 *       403:
 *         description: Staff exists
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: {
 *               "param": "STAFF_EXISTS"
 *             }
 *           }
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'USER_NOT_FOUND'
 *             }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/staff:
 *   get:
 *     summary: Get staffs list of store
 *     tags:
 *       - Staff
 *     parameters:
 *       - name: "limit"
 *         in: "query"
 *         description: "Total items of a page."
 *       - name: "page"
 *         in: "query"
 *         description: "Page number."
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/staff/invite/:
 *   get:
 *     summary: Get list store invite
 *     tags:
 *       - Staff
 *     parameters:
 *       - name: "limit"
 *         in: "query"
 *         description: "Total items of a page."
 *       - name: "page"
 *         in: "query"
 *         description: "Page number."
 *       - name: "sort"
 *         in: "query"
 *         description: "Sort createdAt:1/-1"
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/staff/:
 *   put:
 *     summary: Update staff info
 *     tags:
 *       - Staff
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           staffId:
 *             type: ObjectId
 *           status:
 *             type: Number
 *             description: 1 2 3 4
 *           value:
 *             type: Number
 *             description: 5000
 *         example: {
 *           "staffId": 5f6acbeb4277964af00e5cf5,
 *           "status": 1,
 *           "value": 500000
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/search-location/:
 *   get:
 *     summary: Search Store Location
 *     tags:
 *       - Staff
 *     parameters:
 *       - name: "limit"
 *         in: "query"
 *         description: "Total items of a page."
 *       - name: "page"
 *         in: "query"
 *         description: "Page number."
 *       - name: "lnt"
 *         in: "query"
 *       - name: "lat"
 *         in: query
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/staff/{id}:
 *   get:
 *     summary: Get staff info
 *     tags:
 *       - Staff
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the staff"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *              {
 *                param: 'USER_NOT_FOUND'
 *              },
 *              {
 *                param: 'NOT_FOUND_ERR'
 *              }
 *             ]
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
 * /stores/staff/{id}:
 *   delete:
 *     summary: delete staff info
 *     tags:
 *       - Staff
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the staff"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: delete staff
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *              {
 *                param: 'NOT_FOUND_ERR'
 *              }
 *             ]
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
 * /stores/category/{id}:
 *   get:
 *     summary: Get Category Of Store
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the staff"
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: delete staff
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *              {
 *                param: 'NOT_FOUND_ERR'
 *              }
 *             ]
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
 * /stores/rating/{type}/{id}:
 *   get:
 *     summary: Get rating by store/product id
 *     tags:
 *       - Products
 *     parameters:
 *      - in: path
 *        name: type
 *        type: number
 *        description: store/product
 *      - in: path
 *        name: id
 *        type: string
 *        description: id store/product
 *      - in: query
 *        name: page
 *        type: number
 *      - in: query
 *        name: limit
 *        type: number
 *      - in: query
 *        name: sort
 *        type: string
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get product list
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/location/:
 *   get:
 *     summary: Get Location Store
 *     tags:
 *       - Location
 *     parameters:
 *       - name: "limit"
 *         in: "query"
 *         description: "Total items of a page."
 *       - name: "page"
 *         in: "query"
 *         description: "Page number."
 *       - name: "lnt"
 *         in: "query"
 *       - name: "lat"
 *         in: query
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/locations/{id}:
 *   get:
 *     summary: Get Location Store By Id
 *     tags:
 *       - Location
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *       - name: "limit"
 *         in: "query"
 *         description: "Total items of a page."
 *       - name: "page"
 *         in: "query"
 *         description: "Page number."
 *       - name: "lnt"
 *         in: "query"
 *       - name: "lat"
 *         in: query
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/locations-store/:
 *   get:
 *     summary: Get Location Store By Token
 *     tags:
 *       - Location
 *     parameters:
 *       - name: "limit"
 *         in: "query"
 *         description: "Total items of a page."
 *       - name: "page"
 *         in: "query"
 *         description: "Page number."
 *       - name: "lnt"
 *         in: "query"
 *       - name: "lat"
 *         in: query
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/location/detail/{id}:
 *   get:
 *     summary: Get Location Store By Store Id
 *     tags:
 *       - Location
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "store id"
 *       - name: "limit"
 *         in: "query"
 *         description: "Total items of a page."
 *       - name: "page"
 *         in: "query"
 *         description: "Page number."
 *       - name: "lnt"
 *         in: "query"
 *       - name: "lat"
 *         in: query
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/search-store/:
 *   get:
 *     summary: Search Store
 *     tags:
 *       - Store
 *     parameters:
 *       - name: "limit"
 *         in: "query"
 *         description: "Total items of a page."
 *       - name: "page"
 *         in: "query"
 *         description: "Page number."
 *       - name: "keyword"
 *         in: "query"
 *       - name: "sort"
 *         in: query
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/location/:
 *   post:
 *     summary: Add store location
 *     tags:
 *       - Location
*     parameters:
*       - name: body
*         in: body
*         required: true
*         properties:
*           name:
*             type: string
*           phone:
*             type: string
*           stateId:
*             type: string
*           countryId:
*             type: string
*           address:
*             type: string
*           lng:
*             type: number
*           lat:
*             type: number
*           isDefault:
*             type: boolean
*         example: {
*           "name": name,
*           "phone": 0933,
*           "isDefault": false,
*           "stateId": ObjectId,
*           "countryId": ObjectId,
*           "address": Address A,
*           "lng": 105.501488,
*           "lat": 9.843626
*         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/location/:
 *   put:
 *     summary: Update store location
 *     tags:
 *       - Location
*     parameters:
*       - name: body
*         in: body
*         required: true
*         properties:
*           id:
*             type: string
*           name:
*             type: string
*           phone:
*             type: string
*           stateId:
*             type: string
*           countryId:
*             type: string
*           address:
*             type: string
*           loc:
*             type: object
*           isDefault:
*             type: boolean
*         example: {
*           "id": "6094f1c2a425d338f1b95cae",
*           "name": name,
*           "phone": 0933666666,
*           "isDefault": false,
*           "stateId": "6094f1c2a425d338f1b95cae",
*           "countryId": "6094f1c2a425d338f1b95cae",
*           "districtId": "6094f1c2a425d338f1b95cae",
*           "address": Address A,
*             "loc" : {
*               "coordinates" : [
*            111,
*            2222
*           ],
*           "type" : "Point"
*           }
*         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/locations/{id}:
 *   delete:
 *     summary: Delete store location
 *     tags:
 *       - Location
*     parameters:
*       - name: id
*         in: path
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: staff list
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /stores/staffInfo/payment-limit/:
 *   get:
 *     summary: Get Payment Limit
 *     tags:
 *       - Store

 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Store info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: []
 *           }
 *       404:
 *         description: User not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *               param: 'STORE_NOT_FOUND'
 *             }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
