/**
 * @swagger
 * /admin/report-user/:
 *   get:
 *     summary: Admin Get report user
 *     tags:
 *       - Admin Report User
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
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
