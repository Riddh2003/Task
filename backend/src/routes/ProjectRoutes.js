const express = require('express');
const projectController = require('../controllers/ProjectController');
const router = express.Router();

router.route('/getallprojects').get(projectController.getAllProject);
router.route('/createproject').post(projectController.createProject);

router.route('/:id').put(projectController.updateProject);
router.route('/:id').delete(projectController.deleteProject);

module.exports = router;
