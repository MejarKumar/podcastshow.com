const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth")
const Guest = require("../model/guest")
const Team = require("../model/team")
router.get("/", async (req, res) => {

    await Guest.find({ rating: "1" }, (err, guestsItem) => {
        res.render("guestHome", {
            guestsItem
        })

        // console.log(items)
    })
// await Team.find({},(err,teams)=>{   
//     res.render("guestHome",{teams})
// })
 })


router.get("/core_team", (req, res) => {
   Team.find({},(err,items)=>{
     res.render("teamlist",{items})
   })
})
router.get("/all_guest", (req, res) => {
  Guest.find({},(err, items)=>{
    res.render("guestlist",{items})
  })
})


module.exports = router;