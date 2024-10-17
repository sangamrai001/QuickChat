
const express = require("express") ; 
const router = express.Router() ; 
const {getmess , addmess} = require("../controllers/messages.js");

router.get("/getmsg" ,getmess)
router.post("/addmsg" ,addmess)

module.exports = router;

