const  User= require("../models/user");
const Code = require('../models/code');
const bcrypt = require("bcrypt");

const Reservation = require('../models/reservation');

exports.postlogin = async (req, res, next) =>{
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).render('admin/login',{error: true,errorMessage: "mot de passe ou email invalide"});
    
        const validPassword = await bcrypt.compare(
            req.body.mdp,
            user.password
        );
        if (!validPassword)
            return res.status(400).render('admin/login',{error: true,errorMessage: "mot de passe ou email invalide"});
         req.session.isLoggedIn = true;
         req.session.user = user;   
        res.redirect('/users/dashboard');
    
    } catch (error) {
        console.log(error);
        res.send("il y a une erreur");
    }
}
exports.getLogin = (req, res, next) => {
    console.log(req.session);
    res.render('admin/login',{error: false});
}


// Partie signup
exports.getSignup = (req, res, next) => {
    res.render('admin/signup',{error: false});
}

exports.postSignup = async (req, res, next) => {
    let code =  await Code.findOne({content :req.body.secretCode});
   if(code){
    try {  
      const user = new User();
      user.email = req.body.email;
      user.password = req.body.mdp;
      user.name = req.body.username;
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      res.redirect('/users/login')
  } catch (error) {
      res.send("Il y a une erreur");
  }
   }else{
       res.render('admin/signup',{error: true,errorMessage: "code secret inexistant veuillez ressayer"})
   }
}
exports.getDashboard = async (req, res, next) => {
     let userName = req.session.user.name;
    let reservations =  await Reservation.find({});
    res.render('admin/dashboard',{reservations,userName})
}

exports.getUpdateUser = async (req, res, next) => {
      let userId = req.session.user._id;
      let user = await User.findById(userId);
    res.render('admin/modifyUser',{user})
}
exports.postUpdateUser = async (req, res, next) => {
    let code =  await Code.findOne({content :req.body.secretCode});
   if(code){
    try {  
      const user = new User();
      user.email = req.body.email;
      user.password = req.body.mdp;
      user.name = req.body.username;
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      res.redirect('/users/login')
  } catch (error) {
      res.send("Il y a une erreur");
  }
   }else{
       res.render('admin/signup',{error: true,errorMessage: "code secret inexistant veuillez ressayer"})
   }
}
exports.postLogout =  (req, res, next) => {
     req.session.destroy();
     res.redirect('/');
}
exports.getReservationInfo = async (req, res, next) => {
    let reservationId =  req.params.reservationId;
    let reservation =  await Reservation.findById(reservationId);
    res.render('admin/Reservation',{reservation});
}


