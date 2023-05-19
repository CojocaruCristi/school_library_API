const express = require('express');


const router = express.Router();
const Model = require('../models/model');


router.post('/createmany', async (req, res) => {
    const data = req.body.books;
    try {
        // const dataToSave = await data.save();
        // res.status(200).json(dataToSave);
        await Model.insertMany(data);
        res.status(200).end();

    } catch (error) {
        res.status(400).json({message: error});
    }
})

router.post('/post', async (req, res) => {
    const data = new Model({
        ...req.body
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message: error});
    }
})

router.get('/books', async (req, res) => {
    const bookType = req.query.bookType;
    const specialty = req.query.specialty;
    const year = req.query.schoolYear;





    try {
        // const data = await Model.find();
        let data;
        if(bookType === 'specialty') {
            data = await Model.find({bookType: bookType, specialty})
        }
        if(bookType === 'general') {
            data = await Model.find({bookType: bookType, schoolYear: year})
        }


        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error});
    }

})

// router.get('/getOne/:id', (req, res) => {
//     res.send(req.params.id);
// })

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true}

        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        
        res.status(200).send(`Document with name "${data.name}" deleted successfully`);
    } catch (error) {
        res.status(400).json({message: error});
    }
})


module.exports = router;