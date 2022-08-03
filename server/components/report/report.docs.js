/**
 * @swagger
 * /report-chat:
 *   post:
 *     summary: Report chat
 *     tags:
 *       - Store
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           userId:
 *             type: string
 *           note:
 *             type: string
 *           type:
 *             type: number
 *           isBlock:
 *             type: boolean
 *         example: {
 *           "userId": "objectId",
 *           "note": "objectId",
 *           "type": 1,
 *           "isBlock": true
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