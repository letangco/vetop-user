/**
 * @swagger
 * /admin/location-default/:
 *   post:
 *     summary: Add Location Default
 *     tags:
 *       - Location Default
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           lat:
 *             type: number
 *           lng:
 *             type: number
 *           address:
 *             type: string
 *         example: {
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
 * /admin/location-default/:
 *   put:
 *     summary: Update Location Default
 *     tags:
 *       - Location Default
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           _id:
 *             type: string
 *           lat:
 *             type: number
 *           lng:
 *             type: number
 *           address:
 *             type: string
 *         example: {
 *           "_id": objectId,
 *           "address": Address A,
"loc": {
      "type": "Point",
      "coordinates": [
        105.501488,
        9.843626
      ]
    },
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
 * /admin/location-default/status:
 *   put:
 *     summary: Update Status Location Default
 *     tags:
 *       - Location Default
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           _id:
 *             type: string
 *         example: {
 *           "_id": objectId
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
 * /admin/location-default/:
 *   get:
 *     tags:
 *       - Location Default
 *     summary: Get Location Default
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
 * /admin/location-default/{id}:
 *   get:
 *     tags:
 *       - Location Default
 *     summary: Get Location Default
 *     parameters:
 *       - name: "id"
 *         in: "path"
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
 * /admin/location-default/{id}:
 *   delete:
 *     tags:
 *       - Location Default
 *     summary: Delete Location Default
 *     parameters:
 *       - name: "id"
 *         in: "path"
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
