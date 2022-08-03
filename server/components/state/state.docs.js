
/**
 * @swagger
 * /states/detail/{id}:
 *   get:
 *     tags:
 *       - State
 *     summary: get State info
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of State that needs to be get country info"
 *         required: true
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
 * /states/district/{id}:
 *   get:
 *     tags:
 *       - State
 *     summary: get District by state id
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of State that needs to be get country info"
 *         required: true
 *       - name: "limit"
 *         in: "query"
 *       - name: "page"
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
 * /states:
 *   get:
 *     summary: Get State list
 *     tags:
 *       - State
 *     parameters:
 *      - in: query
 *        name: countryId
 *        type: string
 *        description: countryId
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of State the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of State page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: get State list
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
