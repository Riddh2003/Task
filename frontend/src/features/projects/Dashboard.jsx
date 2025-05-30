import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from './projectSlice';
import Navbar from '../../components/Navbar';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const { projects, loading, error } = useSelector((state) => state.projects);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => { 
        dispatch(fetchProjects(searchTerm)); 
    }, [dispatch, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Projects Dashboard</h1>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            New Project
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                {loading ? (
                    <div className="flex justify-center">
                        <p className="text-gray-600">Loading projects...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects && projects.length > 0 ? (
                            projects.map((project) => (
                                <div key={project._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h2>
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            project.status === 'active' ? 'bg-green-100 text-green-800' : 
                                            project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {project.status}
                                        </span>
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                            <button className="text-red-600 hover:text-red-800">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-3 text-center text-gray-600">No projects found. Create your first project!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}