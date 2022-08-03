/**
 * @swagger
 * /problem-support:
 *   get:
 *     tags:
 *       - Problem Support
 *     summary: get list problem support
 *     parameters:
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of product the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of product page. Page default is 1
 *     responses:
 *       200:
 *         description: List Product
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: list Product
 *           example: {
 *             'success': true,
 *             'payload': true
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /problem-support/{id}:
 *   get:
 *     summary: Get info Problem for support
 *     tags:
 *       - Problem Support
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id of Problem for support
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Details Problem for support
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': {
 *                  }
 *          }
 *       404:
 *         description: Problem not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy vấn đề này!",
 *                      "param": "PROBLEM_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
