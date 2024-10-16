const express = require("express");
const router = express.Router();

module.exports = router
router
   .use((req, res) => {
           res.status(404);
           res.json({
               error: "Page not found"
           });
       });