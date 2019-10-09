const express = require('express');

const db = require('../data/dbConfig');



const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve accounts' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const accounts = await db('accounts').where({ id });

        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve accounts' });
    }
});

router.post('/', async (req, res) => {
    try {
        const accountData = req.body;
        const [id] = await db('accounts').insert(accountData);
        const newAccountEntry = await db('accounts').where({ id });

        res.status(201).json(newAccountEntry);
    } catch (err) {
        console.log('POST error', err);
        res.status(500).json({ message: "Failed to store data" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const editedAcctData = req.body;
        const editedAcctDataEntry = await db('accounts')
            .where({ id: req.params.id })
            .update(req.body)
            .then(count => {
                if (count) {
                    res.status(200).json({ message: `${count} record(s) updated` });
                } else {
                    res.status(404).json({ message: 'Account not found' });
                }
            })
    } catch (err) {
        res.status(500).json({ message: 'Could not update the account' });
    }

});

router.delete('/:id', async (req, res) => {
    try {
        db('accounts')
            .where({ id: req.params.id })
            .del()
            .then(count => {
                res.status(200).json({ message: `${count} record(s) deleted` });
            })
    } catch{
        res.status(500).json({ message: 'Could not remove the account' });
    }
});

module.exports = router;