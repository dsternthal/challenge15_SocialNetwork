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
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:ThoughtId/reactions
router.route('/:thoughtId/reactions').post(addReactions);

// /api/Thoughts/:ThoughtId/tags/:tagId
router.route('/:ThoughtId/reactions/:reactionId').delete(removeReactions);

module.exports = router;
