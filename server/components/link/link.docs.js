/**
 * @swagger
 * /link/get-info/{id}:
 *   get:
 *     summary: get info link by id
 *     tags:
 *       - Link
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
 * /link/get-list:
 *   get:
 *     summary: Get list linked by User
 *     tags:
 *       - Link
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
