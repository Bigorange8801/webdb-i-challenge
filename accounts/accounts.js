const express = require('express')
const db = require('../data/dbConfig');
const router = express.Router();


//GET /api/accounts
router.get("/", (req, res) => {
    db.select('*')
      .from('accounts')
        .then(accountInfo => {
          res.status(200).json(accountInfo)
        })
        .catch(error => {
          res.status(500).json(error)
        })
  })
  
  //POST /api/accounts
  router.post("/", (req, res) => {
    const postData = req.body;
    db('accounts')
      .insert(postData, 'id')
        .then(([id]) => {
            db('accounts')
              .where({ id }) 
              .first() 
              .then(account => {
                  res.status(200).json(account);
              });
        })
    .catch(err => {
        res.json(err);
    });
  });
  
  //UPDATE /api/accounts/:id
  router.put("/:id", (req, res) => {
    const changes = req.body
    db('accounts')
      .where("id", req.params.id)
      .update(changes)
      .then(account => {
        res.status(200).json({ message: `Updated ${account} entries` })
      })
      .catch(error => {
        res.json(error)
      })
  })
  
  //DELETE /api/accounts/:id
  router.delete("/:id", (req, res) => {
    db("accounts")
      .where("id", req.params.id)
      .del()
      .then(account => {
        res.status(200).json({ message: `deleted ${account} entries`})
      })
      .catch(error => {
        res.json(error);
      })
  })
  
  module.exports = router;