/**
 * @swagger
 * /admin/terms-policy/{type}:
 *   put:
 *     tags:
 *       - Admin - Terms Policy - Information - Instruction - Model - Recommendation
 *     summary: Create/Update a Policy - Info - Instruction - Model- Recommendation by Admin
 *     parameters:
 *       - name: "type"
 *         in: "path"
 *         description: policy/info/instruction/model/recommendation
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
 *           "title": "A Privacy Policy is a Legal Requirement",
 *           "content": "Our Privacy Policy generator is compliant with all of the major laws",
 *         }
 *     responses:
 *       200:
 *         description: Update a policy
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
 *             'payload': [{
 *                   "_id": "5fdc4fd1ff59a80e3439dfc6",
 *                   "status": true,
 *                   "title": "A Privacy Policy is a Legal Requirement",
 *                   "content": "Our Privacy Policy generator is compliant with all of the major laws",
 *                   "__v": 0
 *              }]
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
 *         description: Term and Policy not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy các điều khoản - chính sách này",
 *                      "param": "TERM_POLICY_NOT_FOUND"
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
 * /admin/terms-policy/{type}:
 *   get:
 *     summary: Get info Policy - Info - Instruction - Model - Recommendation by Admin by Admin
 *     tags:
 *       - Admin - Terms Policy - Information - Instruction - Model - Recommendation
 *     parameters:
 *       - name: "type"
 *         in: "path"
 *         description: policy/info/instruction/model/recommendation
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your Policy info
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': [{
 *                   "_id": "5fdc4fd1ff59a80e3439dfc6",
 *                   "status": true,
 *                   "title": "A Privacy Policy is a Legal Requirement",
 *                   "content": "Our Privacy Policy generator is compliant with all of the major laws",
 *                   "__v": 0
 *              }]
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
 *         description: Term and Policy not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy các điều khoản - chính sách này",
 *                      "param": "TERM_POLICY_NOT_FOUND"
 *                      }
 *                  ]
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
