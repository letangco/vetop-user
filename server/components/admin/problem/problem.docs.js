/**
 * @swagger
 * /admin/problem-support:
 *   post:
 *     tags:
 *       - Admin - Problem Support
 *     summary: Create a Problem for Screen Support By admin
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           problem:
 *             type: string
 *         example: {
 *           "problem": "Forgot password",
 *         }
 *     responses:
 *       200:
 *         description: Create a problem for screen support
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Problem info
 *           example: {
 *             'success': true,
 *             'payload': []
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
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/problem-support:
 *   get:
 *     tags:
 *       - Admin - Problem Support
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
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/problem-support/{id}:
 *   get:
 *     summary: Get info Problem for support
 *     tags:
 *       - Admin - Problem Support
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

/**
 * @swagger
 * /admin/problem-support/{id}:
 *   put:
 *     tags:
 *       - Admin - Problem Support
 *     summary: Update Problem for Support
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id Problem Support
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           title:
 *             type: string
 *           content:
 *             type: string
 *         example: {
 *           "problem": "A Support is a Legal Requirement",
 *         }
 *     responses:
 *       200:
 *         description: Update a term and policy
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
 *             'payload': true
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
 *         description: Problem for support not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy vấn đề này",
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
 * /admin/problem-support/{id}:
 *   delete:
 *     summary: Delete a Problem for Support by Admin
 *     tags:
 *       - Admin - Problem Support
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id of Problem Support need delete by Admin
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Details Problem Support has deleted
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': true
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
 *         description: Special Product not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy vấn đề này!",
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
