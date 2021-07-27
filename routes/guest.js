const express = require("express");
const router = express.Router();
const {ensureAuth} = require("../middleware/auth")

router.get("/",(req,res)=>{
    res.send("Home Page");
})


router.get("/core_team",(req,res)=>{
    res.send("Core team list")
})
router.get("/all_guest",(req,res)=>{
    res.send("All guest list")
})


module.exports = router;