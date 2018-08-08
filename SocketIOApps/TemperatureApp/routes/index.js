const express = require("express")

const router = express.Router();

router.get('/', (req, res)=> {
    res.send({response:"I am alive"}).status(200);
});

router.get('/index', (req,res)=>{
    res.send({response: "You requested the index page"}).status(200);
});

module.exports = router;
