import {Schema, model} from "mongoose";

const reviewSchema = new Schema({
    review: {
        type: String,
        required: [true, "Review can not be empty!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    creadedAt: {
        type: Date,
        default: Date.now
    },
    tour: {
        type: Schema.ObjectId,
        ref: "Tours",
        required: [true, "Review must belong to a tour!"]
    },
    user: {
        type: Schema.ObjectId,
        ref: "Users",
        required: [true, "User must belong to a user!"]
    }   
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//QUERY MIDDLEWARES: 
reviewSchema.pre(/^find/, function(next){

    //If we use this method, will create a chain of populates. We have the tour being populated with reviwes, but then the reviews also get populated with the tour again, and also with the use
    // this.populate({ //We use "this" because, in query middleware, "this" always points to the current query. So now, all of the queries will then automatically populate the guides field with the reference user.
    //     path: "tour", // tour and user stand for the name of the fields in the schema. 
    //     select: "name" 
    // }).populate({
    //     path: "user",
    //     select: "name photo"
    // });

    //Methos 2
    this.populate({
        path: "user",
        select: "name photo"
    });
    next();
});
//At this point, we've populated the reviews with the tour and the user data right at the top. So, when we query for reviews, we get access to that information. But, that still leaves one problem unsolved,
//and it's related to how can we get access to reviews on the tours?. That's to say, query for a specific tour and then get access to all the reviews for that tour. This problem arises because we did 
//parent referencing on the reviews. Basically having the reviews pointingto the tours and not the tours pointing to the reviews. As we know, the parent doesn't know about its children (in this case, 
//the tour doesn't know about its reviews). To fix that we'll use child referencing on tours, which is basically keep an away of all the review ID's on each tour document. Then, all we'd have to do is to 
//populate that array. And the main method will be "virtual Populate" by MongoDB. With this, we can populate the tour with reviews, get access to all the reviews for a certain tour but without keeping
//this array of ID's on the tour. This is basically a way of keeping that array of reviews ID's on a tour but without persisting it to the database.

const ReviewModel = model("Review", reviewSchema);
export { ReviewModel };