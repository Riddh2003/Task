const projectModel = require('../models/ProjectModel');

const getAllProject = async (req, res) => {
    const query = {
        admin: req.admin._id,
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
}

const createProject = async (req, res) => {
    const project = await projectModel.create({ ...req.body, admin: req.admin._id });
    res.status(201).json({
        message: "Project successfully created...",
        data: project,
    })
}

const updateProject = async (req, res) => {
    const project = await projectModel.findOneAndUpdate(
        { _id: req.params.id, user: req.admin._id },
        req.body,
        { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({
        message: "Project updated...",
        data: project,
    });
};

const deleteProject = async (req, res) => {
    const project = await projectModel.findOneAndDelete({ _id: req.params.id, admin: req.admin._id });
    if (!project) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
};

module.exports = {
    getAllProject,
    createProject,
    updateProject,
    deleteProject
}