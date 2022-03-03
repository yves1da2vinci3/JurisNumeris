var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController')
const AsyncHandler = require('express-async-handler');
const AuthMiddleware = require('../middleware/auth');
// login part
router.get("/login",AuthController.getLogin)
router.post("/login", AsyncHandler(AuthController.postlogin))
// signup part
 router.get("/signup", AuthController.getSignup)

 router.post("/signup",AsyncHandler(AuthController.postSignup))
 router.post("/logout",AuthController.postLogout)
 router.get('/reservation/:reservationId', AuthMiddleware,AsyncHandler(AuthController.getReservationInfo))
  
 
  // dashboard part
  router.get("/dashboard",AuthMiddleware,AsyncHandler(AuthController.getDashboard) )
  router.get("/updateUser",AuthMiddleware,AuthController.getUpdateUser)

module.exports = router;
