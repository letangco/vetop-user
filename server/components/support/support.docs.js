/**
 * @swagger
 * /support/create-support-by-email:
 *   post:
 *     summary: Create a support by email
 *     tags:
 *       - Support
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           problemId:
 *             type: string
 *           title:
 *             type: string
 *           content:
 *             type: string
 *           email:
 *             type: string
 *         example: {
 *           "problemId": "5fd496f3dcb13d31202d3e5d",
 *           "title": "Tiêu đề hỗ trợ",
 *           "email": "tesse.io@gmail.com",
 *           "content": "Nội dung cần hỗ trợ"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: a support has send
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
 *         description: Product not found
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
 *                param: 'NOT_FOUND_ERR[5fd5ac60d3ee7038e089a151]'
 *              }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
