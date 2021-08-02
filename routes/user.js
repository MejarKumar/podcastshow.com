const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth")
const Guest = require("../model/guest")
const Team = require("../model/team")
router.get("/", async (req, res) => {

    await Guest.find({}, (err, guestsItem) => {
        res.render("guestHome", {
            guestsItem
        })
    }).sort({createdAt:'desc'}).limit(4);


 })
router.get("/error",(req,res)=>{
  res.render("404");
})
router.get("/all_team_members", (req, res) => {
   Team.find({},(err,items)=>{

    if(err){
      console.log(err);
      res.render("404");
    }else{
      res.render("teamlist",{items})
    }

    
   })
})
router.get("/all_guest", async(req, res) => {
 await Guest.find({},(err, items)=>{
  if(err){
    console.log(err);
    res.render("404");
  }else{
    res.render("guestlist",{items})
  }}).sort({createdAt: 'desc'}).lean();
})


module.exports = router;