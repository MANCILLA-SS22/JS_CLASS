import { TourModel } from '../models/tours.model.js';
import { UserModel } from '../models/userModel.js';
import { catchFunc } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

const getOverview = catchFunc(async function(req, res, next){
  const tours = await TourModel.find();
  res.status(200).render('overview', { title: 'All Tours', tours });
});

const getTour = catchFunc(async function(req, res, next){
  const {slug} = req.params
  const tour = await TourModel.findOne({ slug: slug }).populate({ path: 'reviews', fields: 'review rating user' }); //path: 'reviews' comes from the virtual middleware in tours.model.js. We can't see the "reviews" field in mongodb but in postman because that's just a VIRTUAL middleware.
  if (!tour) return next(new AppError('There is no tour with that name.', 404));
  res.status(200).render('tour', { title: `${tour.name} Tour`, tour });
});

const getLoginForm = function(req, res){
  res.status(200).render('login', {title: 'Log into your account'});
};

const getAccount = function(req, res){
  res.status(200).render('account', {title: 'Your account'});
};

const updateUserData = catchFunc(async function(req, res, next){
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', { title: 'Your account', user: updatedUser });
});

export {getOverview, getTour, getLoginForm, getAccount, updateUserData};