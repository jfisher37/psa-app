const express = require('express');
const { User } = require('../database/models');
const { authenticationRequired } = require('../middlewares');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userRouter = express.Router();


//Sign up route:
userRouter.post('/signup/', async (req, res) => {
  const first = req.body.first.toLowerCase();
  const last = req.body.last.toLowerCase();
  const email = req.body.email.toLowerCase();
  const { password } = req.body;

 console.log("SIGNUP", req.body);

  // Make sure password isn't too long
  if (new Blob([password]).size > 4096) {
    return res.status(400).json( {message: 'password too long'});
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //checks to see if acct for email already exists
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      first: first,
      last: last,
      password: hashedPassword,
    }
  });

  if (created) {
    res.json({message: `${user.first}'s account has been created`});
  } else {
    res.json({message: 'An account is already attached to this email address.'})
  }
});

//Edit password: 
userRouter.put('/edit-password/', authenticationRequired, async (req, res) => {
  try {
    const { id, currentPassword, newPassword } = req.body;

    // Find the user by id
    const user = await User.findOne({ where: { id } });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the current password provided in the request with the user's stored password
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    // Hash the new password and update the user's password in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = { userRouter };