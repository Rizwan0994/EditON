require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser =require("body-parser");
const cors = require("cors");
const morgan = require('morgan')
const authRoutes = require('./routes/user.routes')
const PORT= 4943;
const videoRouter = require('./routes/video.routes')
const compression = require('compression')
const userModel = require("./models/user.model")
const Video = require('./models/video.model')
const app = express();

app.use(compression());

app.use(morgan('dev'))

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

app.use("/api/v1/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('Hello From  EditON')
})

app.use('/', videoRouter)

// Create a new endpoint in your routes for email verification
app.get('/verify/:token', async (req, res) => {
    const verificationToken = req.params.token;
    console.log(verificationToken)
    try {
      const user = await userModel.findOne({ verificationToken });
      if (!user) {
        return res.status(404).send({ message: 'Invalid verification token' });
      }
  
      // Mark the email as verified in the user document
      user.isEmailVerified = true;
      user.verificationToken = undefined; // Clear the verification token
      await user.save();
  
      // Redirect the user to a page 
      // You can also send a JSON response if you prefer
      //res.redirect('http://localhost:5173/completeRegistration');
      res.status(200).send({
        success: true,
        message: 'Email verified Successfully.',
      });
   

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error verifying email', error });
    }
  });
  
  app.post('/completeRegistration', async (req, res) => {
    try {
      // Extract data from the request body, including userType
      const { name, country, email, state, city, language, terms_conditions, userType } = req.body;
  
      // Define the update operation
      const update = {
        $set: {
          name,
          country,
          state,
          city,
          language,
          terms_conditions,
          userType,
        },
      };
  
      // Find the user by email and update their document
      const result = await userModel.findOneAndUpdate({ email }, update, { new: true });
  
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send a success response
      res.status(200).json({ message: 'User Registration Completed!', updatedUser: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  //.....get all creators....
  app.get ('/getCreators', async (req, res) => {
    try {
      const creators = await userModel.find({ userType: 'creator' });
      console.log(creators)
      res.status(200).json(creators);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  //..........................UPDATE PROFILE........................
  app.get('/getUserdata/:userId', async (req, res) => {
    try {
      const _id = req.params.userId;
      
      // Use the findById method to find the user by ID
      const user = await userModel.findById(_id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send the user data in the response
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
 // Update user profile
app.put('/updateProfile/:userId', async (req, res) => {
  try {
    const _id = req.params.userId;
    // Extract data from the request body, including userType
    const { name, country, email, state, city, language, terms_conditions, userType, companyName, companyRegistrationNumber } = req.body;

    // Define the update operation
    const update = {
      $set: {
        name,
        country,
        state,
        city,
        language,
        terms_conditions,
        userType,
      },
    };

    // If the user is a company, add company-specific fields to the update operation
    // if (userType === 'company') {
    //   update.$set.companyName = companyName;
    //   update.$set.companyRegistrationNumber = companyRegistrationNumber;
    // }

    // Find the user by userId and update their document
    const result = await userModel.findByIdAndUpdate(_id, update, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send a success response
    res.status(200).json({ message: 'User Profile Updated!', updatedUser: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//.............................
//...............get all users with thier videos.............
// Define the API endpoint to get all users with their video data


app.get('/usersVideos', async (req, res) => {
  try {
    // Find all users
    const users = await userModel.find();

    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }

    const userData = users.map(async user => {
      const videos = await Video.find({ _id: { $in: user.myVideos } });

      return {
        name: user.name,
        id: user._id,
        videos: videos.map(video => ({
          title: video.title,
          video: video.video,
          thumbnail: video.thumbnail,
          date: video.date,
        })),
      };
    });

    // Wait for all user data to be retrieved
    const allUserData = await Promise.all(userData);

    return res.json(allUserData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
  
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
        console.log('Connected to DataBase')
    })).catch(err => console.log(err.message))
