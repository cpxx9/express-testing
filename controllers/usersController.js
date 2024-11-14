const { body, query, validationResult } = require('express-validator');
const { title } = require('process');
const usersStorage = require('../storages/usersStorage');

const alphaErr = 'must only contain letters';
const lengthErr = 'must be between 1 and 10 characters';
const emailErr = 'must be a valid email address';
const ageErr = 'must be between 18 and 20 years old';
const alphaNumErr = 'must only contain letters and numbers';
const bioLengthErr = 'must be no more than 200 characters';

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body('email').trim().isEmail().withMessage(`Email ${emailErr}`),
  body('age')
    .optional({ checkFalsy: true })
    .trim()
    .isInt({ min: 18, max: 120 })
    .withMessage(`Age ${ageErr}`),
  body('bio')
    .optional({ checkFalsy: true })
    .trim()
    .isAlphanumeric('en-US', { ignore: ' ' })
    .withMessage(`Bio ${alphaNumErr}`)
    .isLength({ max: 200 })
    .withMessage(`Bio ${bioLengthErr}`),
];

const validateSearch = [
  query('searchEmail').trim().isEmail().withMessage(`Email ${emailErr}`),
];

exports.usersListGet = (req, res) => {
  res.render('index', {
    title: 'User list',
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render('createUser', {
    title: 'Create user',
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('createUser', {
        title: 'Create User',
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect('/');
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render('updateUser', {
    title: 'Update user',
    user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).render('updateUser', {
        title: 'Update user',
        user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect('/');
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect('/');
};

exports.usersSearchGet = [
  validateSearch,
  (req, res) => {
    const { searchEmail } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).render('index', {
        title: 'User list',
        searchEmail,
        users: usersStorage.getUsers(),
        errors: errors.array(),
      });
    }

    const users = usersStorage.getUsers();
    const foundUser = users.find((user) => user.email === searchEmail);

    if (foundUser) {
      res.status(404).render('search', {
        title: 'Found user:',
        foundUser,
      });
    } else {
      res.render('search', {
        title: 'No users found :(',
      });
    }
  },
];
