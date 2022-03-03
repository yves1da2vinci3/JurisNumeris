var express = require('express');
var router = express.Router();
const AsyncHandler = require('express-async-handler');
const  Formation = require("../models/formation");
const Reservation = require('../models/reservation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Juris Numeris' });
});

router.get('/404', function(req, res, next) {
  res.render('404', { title: 'Juris Numeris' });
});

router.get('/about-us', function(req, res, next) {
  res.render('about-us', { title: 'Juris Numeris' });
});

router.get('/formations', AsyncHandler( async function(req, res, next) {
   let Formations = await Formation.find({});
  res.render('formations', {Formations});
}) )
router.get('/formation/:formationId', AsyncHandler( async function(req, res, next) {
  let formationId =req.params.formationId;
  let formation = await Formation.findById(formationId);
 res.render('formationDetail', {formation});
}) )
router.get('/bill', function(req, res, next) {
  res.render('bill', { title: 'Juris Numeris' });
});
// faire une reservation
router.post("/reservation",AsyncHandler( async function(req, res, next) {
  let reservation =  new Reservation()
 const {email,username,LastName,formationName,Numbtel} = req.body;  
 try{
    reservation.Email = email;
    reservation.userName = username;
    reservation.LastName = LastName;
    reservation.FormationName = formationName;
    reservation.userNumber = Numbtel;
  await reservation.save();
  res.render('bill',{reservation});
 }catch(error){
  console.log('il y a erreur')
 }
     
     
}))


// formation individuelle
module.exports = router;


