/**
 * @swagger
 * /follower:
 *   post:
 *     summary: Create a new follower
 *     tags:
 *       - Follower
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           store:
 *             type: objectId
 *         example: {
 *           storeId: 5f7555a70da3372470065743
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your follower info
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
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /follower/{id}:
 *   delete:
 *     tags:
 *       - Follower
 *     summary: Delete follower by Id
 *     description: This can only be done by the logged in user.
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of store that needs to be get in delete"
 *         required: true
 *     responses:
 *       200:
 *         description: Delete follower completed
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The follower delete
 *           example: {
 *             'success': true
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
 *         description: Follower not found
 *         schema:
 *           type: string
 *           example: "Follower Not Found"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /follower/get-by-user:
 *   get:
 *     summary: Get Follower all from database
 *     tags:
 *       - Follower
 *     parameters:
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of Follower the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of Follower page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your Follower list info
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       404:
 *         description: Follow not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                param: 'NOT_FOUND_ERR'
 *              }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /follower/get-by-store:
 *   get:
 *     summary: Get Follower all from database
 *     tags:
 *       - Follower
 *     parameters:
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of Follower the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of Follower page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your Follower list info
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             "payload": []
 *           }
 *       404:
 *         description: Follow not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                param: 'NOT_FOUND_ERR'
 *              }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
