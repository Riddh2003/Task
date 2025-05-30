const projectModel = require('../models/ProjectModel');

const getAllProject = async (req, res) => {
    try {
        const search = req.query.search || '';
        
        const query = {
            title: {
                $regex: search,
                $options: 'i',
            }
        };
        
        const projects = await projectModel.find(query);
        const total = await projectModel.countDocuments(query);
        
        res.status(200).json({
            projects,
            total
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error: error.message });
    }
}

const createProject = async (req, res) => {
    try {
        const project = await projectModel.create({ ...req.body });
        res.status(201).json({
            message: "Project successfully created...",
            data: project,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error: error.message });
    }
}

const updateProject = async (req, res) => {
    try {
        // Changed from user: req.admin._id to match your model
        const project = await projectModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({
            message: "Project updated...",
            data: project,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating project", error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await projectModel.findOneAndDelete({ _id: req.params.id });
        if (!project) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error: error.message });
    }
};

module.exports = {
    getAllProject,
    createProject,
    updateProject,
    deleteProject
}