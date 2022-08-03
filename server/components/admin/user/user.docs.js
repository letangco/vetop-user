/**
 * @swagger
 * /admin/management-user/change-phone-number:
 *   post:
 *     summary: Change phone number for user by admin
 *     tags:
 *       - Admin - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           phone:
 *             type: string
 *           newPhone:
 *             type: string
 *         example: {
 *            "phone": "01234567890",
 *            "newPhone": "0332858127"
 *              }
 *     responses:
 *       200:
 *         description: The phone updated
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The status change phone update
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
 * /admin/management-user/list-change-phone-number:
 *   get:
 *     summary: List change phone number for user by admin
 *     tags:
 *       - Admin - User
 *     parameters:
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
 *         description: The phone list
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The status change phone update
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
 * /admin/management-user/info-change-phone-number/{id}:
 *   get:
 *     summary: Get info history change phone number By admin
 *     tags:
 *       - Admin - User
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: id of user id (userId)
 *     responses:
 *       200:
 *         description: The history change phone number info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The status change phone update
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

