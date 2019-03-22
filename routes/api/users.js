const express = require("express");
const router = express.Router();
const validateRegisterInput = require("../../validation/users/register");
const validateEditInput = require("../../validation/users/edit");

var users = [
    {
        idUser: 1,
        firstName: 'Umubuganda',
        lastName: 'Tibulate',
        email: 'utibulate@perdu.com',
        birthday: new Date(1889,04,20),
        gender: 'male',
        superUser: false
    },
    {
        idUser: 2,
        firstName: 'Yvon',
        lastName: 'Tousmourir',
        email: 'ytousmourir@perdu.com',
        birthday: new Date(1960,08,07),
        gender: 'male',
        superUser: false
    }
];

// @route   GET api/users/
// @desc    Get all users
// @access  public
router.get("/", (req, res) => res.json(users));

// @route   GET api/users/:idUser
// @desc    Get user by id
// @access  public
router.get("/:idUser", (req, res) => {
    
    const isValidId = Number.isInteger(Number(req.params.idUser));

    if(!isValidId){
        const errors = { message: "idUser must be a number" };
        return res.status(400).json(errors);
    }

    const user = users.find(u => u.idUser == req.params.idUser);
    
    if(!user){
        let errors = { message : "User not found" };
        return res.status(400).json(errors);
    }

    res.json(user);
});

// @route   POST api/users/
// @desc    Register user
// @access  public
router.post("/", (req, res) => {
    
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const emailAlreadyExists = users.some(u => u.email === req.body.email);

    if(emailAlreadyExists) {
        errors.email = "email already exists";
        return res.status(400).json(errors);
    }

    const idUserList = users.map(u => u.idUser);
    const biggerId = Math.max(...idUserList);

    const newUser = {
        idUser: biggerId + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        gender: req.body.gender,
        superUser: req.body.superUser
    };

    const newUsersList = [...users, newUser];

    users = newUsersList;

    res.json(newUser);
});

// @route   POST api/users/:idUser
// @desc    Update user
// @access  public
router.post("/:idUser", (req, res) => {
    
    const isValidId = Number.isInteger(Number(req.params.idUser));
    
    if(!isValidId){
        return res.status(400).json({ message: "idUser must be a number" });
    }

    const userToEdit = users.find(u => u.idUser == req.params.idUser);

    if(!userToEdit){
        let errors = { message : "User not found" };
        return res.status(400).json(errors);
    }

    const { errors, isValid } = validateEditInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const emailAlreadyExists = users.some(u => u.email === req.body.email && u.idUser != req.params.idUser);

    if(emailAlreadyExists) {
        errors.email = "email already exists";
        return res.status(400).json(errors);
    }

    const newUser = {
        ...userToEdit,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        gender: req.body.gender,
        superUser: req.body.superUser
    };

    const usersWithoutUserToRemove = users.filter(u => u.idUser != req.params.idUser);

    const newUsersList = [...usersWithoutUserToRemove, newUser];

    users = newUsersList;

    res.json(users);
});

// @route   DELETE api/users/:idUser
// @desc    Delete user by id
// @access  public
router.delete("/:idUser", (req, res) => {
    
    const isValidId = Number.isInteger(Number(req.params.idUser));

    if(!isValidId){
        const errors = { message: "idUser must be a number" };
        return res.status(400).json(errors);
    }

    const indexToRemove = users
        .map(u => u.idUser)
        .indexOf(parseInt(req.params.idUser));
    
    if (indexToRemove === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const newUsersList = [...users];
    newUsersList.splice(indexToRemove, 1);
    
    users = newUsersList;
    res.json(users);
});

module.exports = router;