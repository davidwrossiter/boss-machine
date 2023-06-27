const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;

    if (weeklyRevenue * numWeeks < 1000000 || !numWeeks || !weeklyRevenue || isNaN(numWeeks) || isNaN(weeklyRevenue)) {
        res.status(400).send();

    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
