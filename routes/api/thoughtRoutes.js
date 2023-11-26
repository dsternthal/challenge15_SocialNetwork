const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReactions,
  removeReactions,
} = require('../../controllers/thoughtController');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router
  .route('/:ThoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/Thoughts/:ThoughtId/tags
router.route('/:ThoughtId/reactions').post(addReactions);

// /api/Thoughts/:ThoughtId/tags/:tagId
router.route('/:ThoughtId/reactions/:reactionId').delete(removeReactions);

module.exports = router;
