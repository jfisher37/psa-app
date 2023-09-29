const express = require('express');
const { MainPage } = require('../database/models');
const { authenticationRequired } = require('../middlewares');

const mainPageRouter = express.Router();

// Get the mainPage information (assuming only one row)
mainPageRouter.get('/get-mainPage', authenticationRequired, async (req, res) => {
  try {
    // Find the first (and only) row in the MainPage table
    const mainPage = await MainPage.findOne();
    
    if (!mainPage) {
      return res.status(404).json({ message: 'MainPage information not found' });
    }
    
    res.json(mainPage);
  } catch (error) {
    console.error('Error retrieving MainPage information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update the mainPage information
mainPageRouter.put('/update-mainPage', authenticationRequired, async (req, res) => {
  try {
    // Find the first (and only) row in the MainPage table
    const mainPage = await MainPage.findOne();
    
    if (!mainPage) {
      return res.status(404).json({ message: 'MainPage information not found' });
    }
    
    // Update mainPage information based on req.body
    const { mainImg, homeText } = req.body;
    
    await mainPage.update({
      mainImg,
      homeText,
    });
    
    res.json({ message: 'MainPage information updated successfully', mainPage });
  } catch (error) {
    console.error('Error updating MainPage information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { mainPageRouter };