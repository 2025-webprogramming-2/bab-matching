res.json({
  ...user.toObject(),
  _id: user._id.toString(), // ObjectId → string
});
