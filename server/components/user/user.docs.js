/**
 * @swagger
 * /users/login/{type}:
 *   post:
 *     summary: Login to your account. If your phone is not verify, push verificationCode from your email to request body
 *     tags:
 *       - User
 *     parameters:
 *       - name: type
 *         in: path
 *         description: "user/store"
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           phone:
 *             type: number
 *           password:
 *             type: string
 *         example: {
 *           "phone": "0905972232",
 *           "password": "example111"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *                phone: "0123456789",
 *                fullName: "Exam Ple",
 *                avatar: {},
 *                token: "string"
 *              }
 *           }
 *       400:
 *         description: When params is missing type - user/store/staff or incorrect telephone, password
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
 *                 "param": "INVALID_TYPE_LOGIN"
 *               },
 *               {
 *                 "param": "PHONE_PASSWORD_INVALID_ERR"
 *               }
 *             ]
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
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": [
 *                  "PASSWORD_INVALID",
 *                  [
 *                  6
 *                  ]
 *                 ],
 *                 "param": "password",
 *                 "location": "body"
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
 * /users/check-code-user:
 *   post:
 *     summary: Check user user has exist on system and get price
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           code:
 *             type: number
 *         example: {
 *           code: 1233211233,
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

/**
 * @swagger
 * /users/get-code:
 *   get:
 *     summary: Get User Code
 *     tags:
 *       - Registry
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

/**
 * @swagger
 * /users/get-store-user:
 *   get:
 *     summary: Get Store User
 *     tags:
 *       - Change Store
 *     parameters:
 *       - name: type
 *         in: query
 *         required: true
 *         description: 'staff/store'
 *       - name: sort
 *         in: query
 *         description: 'storeId/staffId'
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

/**
 * @swagger
 * /users/best-code:
 *   get:
 *     summary: Get Best Code
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: limit
 *         in: query
 *         type: number
 *       - name: page
 *         in: query
 *         type: number
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


/**
 * @swagger
 * /users/default-store:
 *   put:
 *     summary: Update Default Store
 *     tags:
 *       - Change Store
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           storeId:
 *             type: string
 *         example: {
 *           storeId: "Object id",
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

/**
 * @swagger
 * /users/search-code:
 *   get:
 *     summary: Search New Code
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: code
 *         in: query
 *         type: string
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

/**
 * @swagger
 * /users/search-user:
 *   get:
 *     summary: Search User
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: text
 *         in: query
 *         type: string
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

/**
 * @swagger
 * /users/search-all-user:
 *   get:
 *     summary: Search All User
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: text
 *         in: query
 *         type: string
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


/**
 * @swagger
 * /users/update-code/:
 *   put:
 *     summary: Update Code After Select New Code
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           code:
 *             type: string
 *         example: {
 *           code: "123123"
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

/**
 * @swagger
 * /users/change-status-invite:
 *   put:
 *     summary: Change status invite
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           status:
 *             type: boolean
 *         example: {
 *           status: true
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

/**
 * @swagger
 * /users/resend-verify-account:
 *   post:
 *     summary: resend verify account
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           phone:
 *             type: string
 *           code:
 *             type: number
 *         example: {
 *           phone: 0909237877
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: When data cannot be process. User not found
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
 *                 "param": "USER_NOT_FOUND",
 *               },
 *               {
 *                 "param": "TIME_OUT_INVALID",
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
 * /users/avatar:
 *   put:
 *     summary: Update user avatar
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           avatar:
 *             type: string
 *         example: {
 *           avatar: {"name": 5f7a99a88fc9a135b030cbf9_nhathoducba_1601880399509.jpg,"large": 5f7a99a88fc9a135b030cbf9_nhathoducba_1601880399509.jpg,"medium": "5f7a99a88fc9a135b030cbf9_nhathoducba_1601880399509.jpg","small": "5f7a99a88fc9a135b030cbf9_nhathoducba_1601880399509.jpg"},
 *         }
 *     responses:
 *       200:
 *         description: The user avatar uploaded
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: The user avatar url
 *           example: {
 *             'success': true
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       404:
 *         description: User not found
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
 *                 param: 'NOT_FOUND_ERR',
 *
 *               }
 *             ]
 *           }
 *       500:
 *         description: When got server exception
 */

/**
 * @swagger
 * /users/change-password:
 *   put:
 *     summary: Change your password
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           currentPassword:
 *             type: string
 *           newPassword:
 *             type: string
 *         example: {
 *           currentPassword: example111,
 *           newPassword: example222,
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: Change Password Successfully
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
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
 *             errors: [
 *               {
 *                 "param": "NOT_FOUND_ERR",
 *               },
 *               {
 *                 "param": "USER_NOT_FOUND",
 *               },
 *               {
 *                 "param": "CODE_NOT_FOUND",
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
 * /users/update-profile:
 *   put:
 *     summary: update your profile
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           fullName:
 *             type: string
 *           identity:
 *             type: string
 *           address:
 *             type: string
 *           email:
 *             type: string
 *           dob:
 *             type: string
 *           gender:
 *             type: number
 *         example: {
 *           fullName: "Than Pham",
 *           identity: 215037332,
 *           address: "120 thich quang duc",
 *           email: "example@gmail.com",
 *           dob: 12-12-2020,
 *           gender: 1
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: Change Password Successfully
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /users/forgot-password/{step}:
 *   post:
 *     summary: Forgot password
 *     tags:
 *       - User
 *     parameters:
 *       - name: step
 *         in: path
 *         description: "1/2/3"
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           phone:
 *             type: string
 *           newPassword:
 *             type: string
 *           code:
 *             type: string
 *         example: {
 *             phone: 0123456789,
 *             code: 123321,
 *             newPassword: 09876733,
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: 'Change password successfully'
 *           }
 *       403:
 *         description: When data cannot be process. If got "Phone has been already registered"
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
 *                 "msg": "The phone you enter is incorrect.",
 *                 "param": "phone",
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
 * /users/check-phone-number:
 *   post:
 *     summary: Check phone number exist on system before registry account
 *     tags:
 *       - User
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           phone:
 *             type: string
 *         example: {
 *           phone: 0909456789
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your logout info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *                phone: "0123456789",
 *                fullName: "Exam Ple",
 *                avatar: {},
 *                token: "string"
 *              }
 *           }
 *       400:
 *         description: When data cannot be process. If got "Phone has been already registered"
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
 *                 "param": "PHONE_REGISTERED",
 *               }
 *             ]
 *           }
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
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
 * /users/logout:
 *   post:
 *     summary: Logout user and update isOnline equal false
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your logout account
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: Logout successfully
 *           }
 *       401:
 *         description: When your token is invalid. You'll get Unauthorized msg
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: "Unauthorized"
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
 *               "param": "USER_NOT_FOUND"
 *             }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: get user information by token
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your logout info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *                phone: "0123456789",
 *                fullName: "Exam Ple",
 *                avatar: {},
 *                token: "string"
 *              }
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: string
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /users/gender:
 *   get:
 *     summary: get gender
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your logout info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *                phone: "0123456789",
 *                fullName: "Exam Ple",
 *                avatar: {},
 *                token: "string"
 *              }
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: string
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /users/register-check-phone:
 *   post:
 *     summary: (Step 1) Check phone number
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           phone:
 *             type: string
 *         example: {
 *           phone: 0909456789
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your logout info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true
 *           }
 *       400:
 *         description: When data cannot be process. If got "Phone has been already registered"
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
 *                 "param": "PHONE_REGISTERED",
 *               }
 *             ]
 *           }
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
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
 * /users/verify-account:
 *   post:
 *     summary: (Step 2) Verify numberphone and code confirm auth phone
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           phone:
 *             type: string
 *           code:
 *             type: number
 *         example: {
 *           phone: 0909237877,
 *           code: 123321,
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
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
 *             errors: [
 *               {
 *                 "param": "USER_NOT_FOUND",
 *               },
 *               {
 *                 "param": "CODE_NOT_FOUND",
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
 * /users/register/{type}:
 *   post:
 *     summary: (Step 3) Registry account after verify everything
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: type
 *         in: path
 *         description: "user/store/staff"
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           fullName:
 *             type: string
 *           phone:
 *             type: number
 *           password:
 *             type: string
 *           code:
 *             type: string
 *           refer:
 *             type: string
 *         example: {
 *           phone: 0905972232,
 *           fullName: Full Name Example,
 *           password: example111,
 *           code: "123321",
 *           refer: "5f769e48a2ac2708288b3167"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *                phone: 0123456789,
 *                fullName: Exam Ple,
 *                token: "",
 *                avatar: "/uploads/user-avatar/default.png"
 *              }
 *           }
 *       400:
 *         description: When data cannot be process. If got "Phone has been already registered"
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
 *                 "param": "PHONE_REGISTERED",
 *               },
 *               {
 *                 "param": "REFER_NOT_FOUND",
 *               }
 *             ]
 *           }
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
 *               },
 *               {
 *                 "value": "",
 *                 "msg": [
 *                  "PASSWORD_INVALID",
 *                  [
 *                  6
 *                  ]
 *                 ],
 *                 "param": "password",
 *                 "location": "body"
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
 * /users/resend-code:
 *   post:
 *     summary: Resend code verify account (In case user cannot receive msm code)
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           phone:
 *             type: string
 *           code:
 *             type: number
 *         example: {
 *           phone: 0909237877
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: When data cannot be process. User not found
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
 *                 "param": "USER_NOT_FOUND",
 *               },
 *               {
 *                 "param": "TIME_OUT_INVALID",
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
 * /users/change-phone-number/{step}:
 *   post:
 *     summary: Change phone number
 *     tags:
 *       - User
 *     parameters:
 *       - name: step
 *         in: path
 *         description: "1/2"
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           phone:
 *             type: string
 *         example: [
 *         {
 *           phone: 0909456789
 *         },
 *         {
 *           phone: 0909456789,
 *             code: 123321
 *         }
 *         ]
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your logout info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *                phone: "0123456789",
 *                fullName: "Exam Ple",
 *                avatar: {},
 *                token: "string"
 *              }
 *           }
 *       400:
 *         description: When data cannot be process. If got "Phone has been already registered"
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
 *                 "param": "PHONE_REGISTERED",
 *               }
 *             ]
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
 *             errors: [
 *               {
 *                 "param": "USER_NOT_FOUND",
 *               },
 *               {
 *                 "param": "CODE_NOT_FOUND",
 *               },
 *               {
 *                 "param": "NOT_FOUND_ERR",
 *               }
 *             ]
 *           }
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/ValidatorError'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 "value": "",
 *                 "msg": "PHONE_INVALID",
 *                 "param": "phone",
 *                 "location": "body"
 *               }
 *             ]
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: string
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /users/get-qr-detail-info:
 *   get:
 *     summary: get info User QR Code
 *     tags:
 *       - User
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
 *                  "fullName": "Full Name Example",
 *                  "code": "10000000000017",
 *                  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALJSURBVO3BQY7rWg4FwTyE9r/l7BpydAFBsvuZnxHxD2uMYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijXDyUhG9S6ZJwovJEEr5J5YlijVKsUYo1ysXLVN6UhDtU7khCp3Ki8qYkvKlYoxRrlGKNcvFhSbhD5Q6VLgknKp3KE0m4Q+WTijVKsUYp1igXPy4JncpJEk5UflmxRinWKMUa5eLHqXRJuENlkmKNUqxRijXKxYepfJPKSRK6JHQqd6j8S4o1SrFGKdYoFy9LwjcloVPpktCpdEm4Iwn/smKNUqxRijXKxUMqvyQJd6j8kmKNUqxRijXKxUNJ6FS6JJyodEm4Q6VLQqfSJeGOJHQqJ0noVLoknKg8UaxRijVKsUaJf3hREt6k0iXhX6JykoRO5ZOKNUqxRinWKPEPX5SETqVLwh0qXRLuUHlTEjqVLgknKk8Ua5RijVKsUS4eSsKJSqdyh0qXhBOVLglPJKFT6ZLQqfw/FWuUYo1SrFEuXqbSJaFT6ZJwkoROpUvCHSpdEjqVTqVLQqdykoQTlTcVa5RijVKsUeIfflgSOpUuCScqJ0noVE6S0KmcJKFTeaJYoxRrlGKNEv/wQBK+SaVLwolKl4QTlU9KwonKE8UapVijFGuUi5epvCkJTyShU3kiCZ3KSRK+qVijFGuUYo1y8WFJuEPlDpUuCXck4Q6VLgknKidJeFOxRinWKMUa5eLHJaFT6ZLQJaFTOUnCHSonSehU3lSsUYo1SrFGufiPUemS0KmcJKFTOUlCp/JJxRqlWKMUa5SLD1P5JJUuCZ3KiUqXhE7ljiR0Kl0STlSeKNYoxRqlWKNcvCwJ35SEkyR0Km9KQqdyh8qbijVKsUYp1ijxD2uMYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVij/A96dB3tdxUctAAAAABJRU5ErkJggg==",
 *              }
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
 *         description: User not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy người dùng này!",
 *                      "param": "USER_NOT_FOUND"
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
 * /users/change-sim-history:
 *   get:
 *     summary: get change sim histories
 *     tags:
 *       - User
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
 *                  "fullName": "Full Name Example",
 *                  "code": "10000000000017",
 *                  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAALJSURBVO3BQY7rWg4FwTyE9r/l7BpydAFBsvuZnxHxD2uMYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijXDyUhG9S6ZJwovJEEr5J5YlijVKsUYo1ysXLVN6UhDtU7khCp3Ki8qYkvKlYoxRrlGKNcvFhSbhD5Q6VLgknKp3KE0m4Q+WTijVKsUYp1igXPy4JncpJEk5UflmxRinWKMUa5eLHqXRJuENlkmKNUqxRijXKxYepfJPKSRK6JHQqd6j8S4o1SrFGKdYoFy9LwjcloVPpktCpdEm4Iwn/smKNUqxRijXKxUMqvyQJd6j8kmKNUqxRijXKxUNJ6FS6JJyodEm4Q6VLQqfSJeGOJHQqJ0noVLoknKg8UaxRijVKsUaJf3hREt6k0iXhX6JykoRO5ZOKNUqxRinWKPEPX5SETqVLwh0qXRLuUHlTEjqVLgknKk8Ua5RijVKsUS4eSsKJSqdyh0qXhBOVLglPJKFT6ZLQqfw/FWuUYo1SrFEuXqbSJaFT6ZJwkoROpUvCHSpdEjqVTqVLQqdykoQTlTcVa5RijVKsUeIfflgSOpUuCScqJ0noVE6S0KmcJKFTeaJYoxRrlGKNEv/wQBK+SaVLwolKl4QTlU9KwonKE8UapVijFGuUi5epvCkJTyShU3kiCZ3KSRK+qVijFGuUYo1y8WFJuEPlDpUuCXck4Q6VLgknKidJeFOxRinWKMUa5eLHJaFT6ZLQJaFTOUnCHSonSehU3lSsUYo1SrFGufiPUemS0KmcJKFTOUlCp/JJxRqlWKMUa5SLD1P5JJUuCZ3KiUqXhE7ljiR0Kl0STlSeKNYoxRqlWKNcvCwJ35SEkyR0Km9KQqdyh8qbijVKsUYp1ijxD2uMYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVij/A96dB3tdxUctAAAAABJRU5ErkJggg==",
 *              }
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
 *         description: User not found
 *         schema:
 *           type: string
 *           example: {
 *              "success": false,
 *              "errors": [
 *                      {
 *                      "message": "Không tìm thấy người dùng này!",
 *                      "param": "USER_NOT_FOUND"
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
 * /users/sim-mall/change-phone:
 *   put:
 *     summary: Change Phone From Sim
 *     tags:
 *       - Registry
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           sim:
 *             type: string
 *           code:
 *             type: number
 *         example: {
 *           sim: 0909237877,
 *           code: 123123
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your account info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true
 *           }
 *       404:
 *         description: When data cannot be process. User not found
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
 *                 "param": "USER_NOT_FOUND",
 *               },
 *               {
 *                 "param": "TIME_OUT_INVALID",
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
 * /users/notification-change-code:
 *   get:
 *     summary: get notification-change-code
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: Your logout info
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/User'
 *           example: {
 *              success: true,
 *              payload: {
 *                phone: "0123456789",
 *                fullName: "Exam Ple",
 *                avatar: {},
 *                token: "string"
 *              }
 *           }
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: string
 *           example: "Unauthorized"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
