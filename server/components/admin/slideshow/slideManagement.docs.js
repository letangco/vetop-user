/**
 * @swagger
 * /slideshow-home-page/{id}:
 *   get:
 *     summary: Get info Slide show
 *     tags:
 *       - Slideshow
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id Slide
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your slide info
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
 *       404:
 *         description: Slide not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy slide này",
 *                      "param": "SLIDE_SHOW_NOT_FOUND"
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
 * /slideshow-home-page/:
 *   get:
 *     summary: Get list slide
 *     tags:
 *       - Slideshow
 *     parameters:
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of Slide the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of Slide page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: List Slide show
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/Slideshow'
 *           example: {
 *              "success": true,
 *              "payload": []
 *              }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
