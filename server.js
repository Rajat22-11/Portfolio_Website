import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import About from './src/models/About.js';
import Hero from './src/models/Hero.js';
import Experience from './src/models/Experience.js';
import Project from './src/models/Project.js';
import Settings from './src/models/Settings.js'; // Ensure the path is correct and the model is defined

dotenv.config();

const app = express();
const PORT = process.env.VITE_PORT || 5000;
const MONGO_URL = process.env.VITE_MONGO_URI;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB: ', err));

app.use(cors());
app.use(express.json());

// Route to get 'About' information
app.get('/about', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About information not found' });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get 'Hero' information
app.get('/hero', async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: 'Hero information not found' });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get 'Experience' information
app.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get 'Projects' information
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get 'Settings' information
app.get('/settings', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get 'Resume' link
app.get('/api/resume', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings || !settings.resumeLink) {
      return res.status(404).json({ message: 'Resume link not found' });
    }
    res.json({ resumeLink: settings.resumeLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
