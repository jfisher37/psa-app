const express = require('express');
const { Partner } = require('../database/models');
const { authenticationRequired } = require('../middlewares');

const partnerRouter = express.Router();

// Get all partners
partnerRouter.get('/get-partners', authenticationRequired, async (req, res) => {
  try {
    // Retrieve all partners from the database
    const partners = await Partner.findAll();
    res.json(partners);
  } catch (error) {
    console.error('Error retrieving partners:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new partner
partnerRouter.post('/add-partner', authenticationRequired, async (req, res) => {
  try {
    const { name, tier, logo, link } = req.body;

    // Create a new partner instance with the provided data
    const partner = await Partner.create({
      name,
      tier,
      logo,
      link,
    });

    res.json({ message: 'Partner added successfully', partner });
  } catch (error) {
    console.error('Error adding partner:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a specific partner
partnerRouter.put('/update-partner', authenticationRequired, async (req, res) => {
  const partnerId = req.body.partnerId;

  try {
    const partner = await Partner.findByPk(partnerId);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    // Update partner information based on req.body
    const { name, tier, logo, link } = req.body;

    await partner.update({
      name,
      tier,
      logo,
      link,
    });

    res.json({ message: 'Partner updated successfully', partner });
  } catch (error) {
    console.error('Error updating partner:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a specific partner
partnerRouter.delete('/delete-partner', authenticationRequired, async (req, res) => {
  const partnerId = req.body.partnerId;

  try {
    const partner = await Partner.findByPk(partnerId);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    await partner.destroy();
    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { partnerRouter };
