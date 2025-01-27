const express = require('express');
const pollController = require('../controllers/pollController');

const router = express.Router();

router.post('/', pollController.createPoll);
router.get('/active', pollController.getActivePolls);
router.put('/vote', pollController.voteOnPoll);

router.get('/:pollId', pollController.getPoll);
router.get('/:pollId/votes', pollController.getPollVotes);

module.exports = router;
