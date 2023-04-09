const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

//retriving contacts
router.get('/contacts', async (req, resp, next) => {
    var contacts = await Contact.find({});
    if (contacts.length > 0){
        resp.json(contacts);
    }else{
        resp.json('No item found');
    }    
});

//add contact
router.post('/contact', async (req, resp, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });
    var result = await newContact.save().catch(err => err);
    resp.json(result);
});

//delete contact
router.delete('/contact/:id', async (req, resp, next) => {
    var result = await Contact.deleteOne({_id: req.params.id}).catch(err => err);
    resp.json(result);
});

//update contact
router.put('contact/:id', (req, resp, next) => {
    resp.send('not implemented');
});

module.exports = router;
