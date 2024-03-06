const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const {validateToken} = require('../middlewares/AuthMiddleware') // eslint-disable

router.post("/", validateToken, async (req, res, next) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: {PostId: PostId, UserId: UserId},
  });
  if(!found){
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json("Liked the post.");
  } else {
    await Likes.destroy({
      where: {
        PostId: PostId, UserId: UserId,
      },
    });
    res.json("Unliked post.");
  }
})

module.exports = router;