import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from './projectSlice';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const { projects, loading, error } = useSelector((state) => state.projects);

    useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            {loading ? <p>Loading...</p> : (
                <ul className="mt-4 space-y-2">
                    {projects.map((project) => (
                        <li key={project._id} className="p-4 border rounded">{project.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}