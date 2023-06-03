const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt'); 


router.post('/createmany', async (req, res) => {
    const data = req.body.books;
    const refactoredData = data.map(book => {
        return {
            ...book,
            authors: [book.authors]
        }
    })
    try {
        // const dataToSave = await data.save();
        // res.status(200).json(dataToSave);
        await Model.insertMany(refactoredData);
        res.status(200).json(refactoredData).end();

    } catch (error) {
        res.status(400).json({message: error});
    }
})

router.delete('/deletemany', async (req, res) => {
    // const data = req.body.books;
    // const refactoredData = data.map(book => {
    //     return {
    //         ...book,
    //         authors: [book.authors]
    //     }
    // })
    try {
        // const dataToSave = await data.save();
        // res.status(200).json(dataToSave);
        // await Model.insertMany(refactoredData);
        const result = await Model.deleteMany({specialty: 'Calclatoare'});
        res.status(200).end();

    } catch (error) {
        res.status(400).json({message: error});
    }
})

router.post('/post', async (req, res) => {
    const data = new Model({
        ...req.body
    })

    const duplicate = await Model.findOne({bookType: data.bookType, bookName: data.bookName, yearOfIssue: data.yearOfIssue});
    if(!!duplicate?.bookName) {
        res.status(400).json({message: `Such book with name: [${duplicate.bookName}] already exists`});
    } else {
        try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message: error});
    }
    }

    
})

router.get('/books', async (req, res) => {
    const bookType = req.query.bookType;
    const specialty = req.query.specialty;
    const year = req.query.year;

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

router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        
        res.status(200).send(`Document with name "${data.bookName}" deleted successfully`);
    } catch (error) {
        res.status(400).json({message: error});
    }
})


router.post('/user', async (req, res) => {

    await userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
        if (err) 
         next(err);
        else
         res.json({status: "success", message: "User added successfully!!!", data: null});
        
      });
    
})

router.post('/authenticate', async (req, res) => {

          userModel.findOne({email:req.body.email}, function(err, userInfo){
        if (err) {
         next(err);
        } else if(userInfo === null) {
            res.status(401).json({status:"error", message: "Invalid email/password!!!", data:null});
        } else {
        if(bcrypt.compareSync(req.body.password, userInfo.password)) {
        res.json({status:"success", message: "user found!!!", data:{user: userInfo}});
        }else{
        res.status(401).json({status:"error", message: "Invalid email/password!!!", data:null});
        }
        }
       });

   
    
})


module.exports = router;