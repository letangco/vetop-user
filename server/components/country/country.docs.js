
/**
 * @swagger
 * /countries/{id}:
 *   get:
 *     tags:
 *       - Country
 *     summary: Get country info
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of country that needs to be get country info"
 *         required: true
 *     responses:
 *       200:
 *         description: get country info
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
 *             'payload': []
 *           }
 *       404:
 *         description: Country not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "param": "COUNTRY_NOT_FOUND"
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
 * /countries:
 *   get:
 *     summary: Get country list
 *     tags:
 *       - Country
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search by name Country
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of country the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of country page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get country list
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
