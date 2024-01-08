const User = require('../models/userModel');
const Team = require('../models/teamModel');
const Country = require('../models/countryModel');
const City = require('../models/cityModel');
const Ground = require('../models/groundModel');
const Review = require('../models/reviewModel');
const Day = require('../models/dayModel');
const Slot = require('../models/slotModel');
const Contact = require('../models/contactModel');

const findOneUser = (populate, status) => async (req, res, next) => {
  try {
    let query = User.findOne({ userId: req.params.userId });

    if (status) {
      query = query.where('status').equals(status);
    }

    if (populate) {
      query = query.populate(populate);
    }

    const user = await query.exec();
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOneTeam = (populate, status) => async (req, res, next) => {
  try {
    let query = Team.findOne({ teamId: req.params.teamId });

    if (status) {
      query = query.where('status').equals(status);
    }

    if (populate) {
      query = query.populate(populate);
    }

    const team = await query.exec();
    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    req.team = team;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOneCountry = (populate, status) => async (req, res, next) => {
  try {
    let query = Country.findOne({ countryId: req.params.countryId });

    if (status) {
      query = query.where('status').equals(status);
    }

    if (populate) {
      query = query.populate(populate);
    }

    const country = await query.exec();
    if (!country) {
      return res.status(404).json({ message: "Country not found." });
    }

    req.country = country;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOneCity = (populate, status) => async (req, res, next) => {
  try {
    let query = City.findOne({ cityId: req.params.cityId });

    if (status) {
      query = query.where('status').equals(status);
    }

    if (populate) {
      query = query.populate(populate);
    }

    const city = await query.exec();
    if (!city) {
      return res.status(404).json({ message: "City not found." });
    }

    req.city = city;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOneGround = (populate, status) => async (req, res, next) => {
  try {
    let query = Ground.findOne({ groundId: req.params.groundId });

    if (status) {
      query = query.where('status').equals(status);
    }

    if (populate) {
      query = query.populate(populate);
    }

    const ground = await query.exec();
    if (!ground) {
      return res.status(404).json({ message: "Ground not found." });
    }

    req.ground = ground;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const findOneReview = (populate, status) => async (req, res, next) => {
//   try {
//     let query = Review.findOne({ reviewId: req.params.reviewId });

//     if (status) {
//       query = query.where('status').equals(status);
//     }

//     if (populate) {
//       query = query.populate(populate);
//     }

//     const review = await query.exec();
//     if (!review) {
//       return res.status(404).json({ message: "Review not found." });
//     }

//     req.review = review;
//     next();
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

const findOneDay = (populate, status) => async (req, res, next) => {
  try {
    let query = Day.findOne({ dayId: req.params.dayId });

    if (status) {
      query = query.where('status').equals(status);
    }

    if (populate) {
      query = query.populate(populate);
    }

    const day = await query.exec();
    if (!day) {
      return res.status(404).json({ message: "Day not found." });
    }

    req.day = day;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const findOneSlot = (populate, status) => async (req, res, next) => {
//   try {
//     let query = Slot.findOne({ slotId: req.params.slotId });

//     if (status) {
//       query = query.where('status').equals(status);
//     }

//     if (populate) {
//       query = query.populate(populate);
//     }

//     const slot = await query.exec();
//     if (!slot) {
//       return res.status(404).json({ message: "Slot not found." });
//     }

//     req.slot = slot;
//     next();
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

const findOneContact = (populate, status) => async (req, res, next) => {
  try {
    let query = Contact.findOne({ slotId: req.params.messageId });

    if (status) {
      query = query.where('status').equals(status);
    }

    if (populate) {
      query = query.populate(populate);
    }

    const message = await query.exec();
    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    req.message = message;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {findOneUser, findOneTeam, findOneCountry, findOneCity, findOneGround, findOneDay, findOneContact};