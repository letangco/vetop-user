/**
 * @swagger
 * /users/bank/user/:
 *   get:
 *     tags:
 *       - Bank
 *     summary: Get Bank Info Of User
 *     parameters:
 *       - name: "page"
 *         in: "query"
 *       - name: "limit"
 *         in: "query"
 *     responses:
 *       200:
 *         description: get State info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: State info
 *           example: {
 *             'success': true,
 *             'payload': []
 *           }
*       404:
 *         description: State not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "param": "State_NOT_FOUND"
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
 * /users/bank-list:
 *   get:
 *     tags:
 *       - Bank
 *     summary: Get Bank List
 *     parameters:
 *       - name: "page"
 *         in: "query"
 *       - name: "limit"
 *         in: "query"
 *     responses:
 *       200:
 *         description: get State info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: State info
 *           example: {
 *             'success': true,
 *             'payload': []
 *           }
*       404:
 *         description: State not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "param": "State_NOT_FOUND"
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
 * /users/bank/store/:
 *   get:
 *     tags:
 *       - Bank
 *     summary: Get Bank Info Of Store
 *     parameters:
 *       - name: "page"
 *         in: "query"
 *       - name: "limit"
 *         in: "query"
 *     responses:
 *       200:
 *         description: get State info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: State info
 *           example: {
 *             'success': true,
 *             'payload': []
 *           }
*       404:
 *         description: State not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "param": "State_NOT_FOUND"
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
 * /users/bank/store/{id}:
 *   delete:
 *     summary: Remove bank info store
 *     tags:
 *       - Bank
*     parameters:
*       - name: id
*         in: path
*         required: true
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
 * /users/bank/user/{id}:
 *   delete:
 *     summary: Remove bank info user
 *     tags:
 *       - Bank
*     parameters:
*       - name: id
*         in: path
*         required: true
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
 * /users/bank/user:
 *   post:
 *     summary: Add bank info user
 *     tags:
 *       - Bank
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           bankId:
 *             type: string
 *           ownerName:
 *             type: string
 *           bankName:
 *             type: string
 *           bankBranch:
 *             type: string
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
 * /users/bank/store:
 *   post:
 *     summary: Add bank info store
 *     tags:
 *       - Bank
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           bankId:
 *             type: string
 *           ownerName:
 *             type: string
 *           bankName:
 *             type: string
 *           bankBranch:
 *             type: string
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
 * /users/bank/user:
 *   put:
 *     summary: Update bank info user
 *     tags:
 *       - Bank
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           bankInfoId:
 *             type: string
 *           bankId:
 *             type: string
 *           ownerName:
 *             type: string
 *           bankName:
 *             type: string
 *           bankBranch:
 *             type: string
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
 * /users/bank-default/user/status/:
 *   put:
 *     summary: Update status bank info user
 *     tags:
 *       - Bank
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           bankInfoId:
 *             type: string
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
 * /users/bank-default/store/status/:
 *   put:
 *     summary: Update status bank info store
 *     tags:
 *       - Bank
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           bankInfoId:
 *             type: string
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
 * /users/bank/store:
 *   put:
 *     summary: Update bank info store
 *     tags:
 *       - Bank
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           bankInfoId:
 *             type: string
 *           bankId:
 *             type: string
 *           ownerName:
 *             type: string
 *           bankName:
 *             type: string
 *           bankBranch:
 *             type: string
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


