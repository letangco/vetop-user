/**
 * @swagger
 * /admin/bank-list:
 *   post:
 *     summary: Add bank info store
 *     tags:
 *       - Bank
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           bankCode:
 *             type: string
 *           image:
 *             type: string
 *         example: {
 *           "name": Vietcombank,
 *           "bankCode": VCB,
 *           "image": {"name": "5fcf2ea24ce4e10145fc7da6_thietkelogosaokimdep3_1610358530261.jpg", "large": "5fcf2ea24ce4e10145fc7da6_thietkelogosaokimdep3_1610358530261", "medium": "284x141_5fcf2ea24ce4e10145fc7da6_thietkelogosaokimdep3_1610358530261", "small":"142x71_5fcf2ea24ce4e10145fc7da6_thietkelogosaokimdep3_1610358530261 ao"}
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
 * /admin/bank-list/{id}:
 *   delete:
 *     summary: Add bank info store
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
 * /admin/bank-list:
 *   put:
 *     summary: Update bank info store
 *     tags:
 *       - Bank
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           bankCode:
 *             type: string
 *           image:
 *             type: string
 *         example: {
 *           "name": Vietcombank,
 *           "bankCode": VCB,
 *           "image": {"name": "5fcf2ea24ce4e10145fc7da6_thietkelogosaokimdep3_1610358530261.jpg", "large": "5fcf2ea24ce4e10145fc7da6_thietkelogosaokimdep3_1610358530261", "medium": "284x141_5fcf2ea24ce4e10145fc7da6_thietkelogosaokimdep3_1610358530261", "small":"142x71_5fcf2ea24ce4e10145fc7da6_thietkelogosaokimdep3_1610358530261 ao"}
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
 