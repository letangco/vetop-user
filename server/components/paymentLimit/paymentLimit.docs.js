/**
 * @swagger
 * /payment-limit:
 *   post:
 *     summary: Add payment limit for staff
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           staffId:
 *             type: string
 *           value:
 *             type: number
 *         example: {
 *           staffId: "StaffId",
 *           value: 1000000000
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Check code
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: When data cannot be process. User not found, code not found
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */