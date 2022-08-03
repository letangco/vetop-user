/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get info News
 *     tags:
 *       - News
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: id of News
 *         required: true
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Details News
 *         schema:
 *           type: object
 *           example: {
 *             "success": true,
 *             'payload': {
 *                  "images": [
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              },
 *                              {
 *                              "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                              "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                              }
 *                          ],
 *                  "title": "Giới thiệu ID mới nhận ngay 500.000 VTĐ. Hơn thế nữa là được nhận hoa",
 *                  "meta_description": "",
 *                  "description": "Tin tức được xem nhiều nhất",
 *                  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
 *                  "author": "Nguyuyễn Trong Nghĩa",
 *                  "categories": [
 *                      "5fdb98e78e7c6a315ceac9c6",
 *                      "5fdb98e78e7c6a315ceac9d0"
 *                  ],
 *                  "tags": [
 *                      "Điện thoại",
 *                      "Điện tử"
 *                  ],
 *                  "status": true,
 *                  "special_news": false,
 *                  "_id": "5fdc937c9c01645be4be07e3",
 *                  "avatar": {
 *                      "name": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "large": "5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "medium": "85x85_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png",
 *                      "small": "43x43_5fd1dfbab0c6884f141e7960_logo_5ea144c529e9f_67_zamologo_1608287339904.png"
 *                  },
 *                  "adminId": "5fc890ca2baa9445cc23e31a",
 *                  "createdAt": "2020-12-18T11:33:16.682Z",
 *                  "updatedAt": "2020-12-18T11:33:16.682Z",
 *              "__v": 0
 *              }
 *          }
 *       404:
 *         description: News not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy tin tức này!",
 *                      "param": "NOT_FOUND_ERR"
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
 * /news/:
 *   get:
 *     summary: Get all News with specialNews = false from database
 *     tags:
 *       - News
 *     parameters:
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: text search
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of user the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of user page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: List News info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/News'
 *           example: {
 *              success: true,
 *              total_page: 1,
 *              total_item: 4,
 *              page: 1,
 *              item: 4,
 *              payload: []
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
 * /news/special-news/news:
 *   get:
 *     summary: Get special News from database
 *     tags:
 *       - News
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Special News info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/News'
 *           example: {
 *              success: true,
 *              total_page: 1,
 *              total_item: 4,
 *              page: 1,
 *              item: 4,
 *              payload: []
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
 * /news/filter-related-news/{id}:
 *   get:
 *     summary: Get related News from database
 *     tags:
 *       - News
 *     parameters:
 *      - name: "id"
 *        in: "path"
 *        description: id of Categories need get related News
 *        required: true
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Specifies the maximum number of related news the query will return. Limit default is 10
 *      - in: query
 *        name: page
 *        type: number
 *        description: Specifies the number of related news page. Page default is 1
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: List Related News info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/News'
 *           example: {
 *              success: true,
 *              total_page: 1,
 *              total_item: 4,
 *              page: 1,
 *              item: 4,
 *              payload: []
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
