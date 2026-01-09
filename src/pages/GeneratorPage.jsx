import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { useApp } from '../contexts/AppContext';

export const GeneratorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loadProject, showToast, currentProject } = useApp();
    const [isLoading, setIsLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            // Check if project is already loaded to avoid refetching
            if (currentProject && currentProject.id === parseInt(id)) {
                setIsLoading(false);
                return;
            }

            const fetchProject = async () => {
                try {
                    await loadProject(id);
                } catch (error) {
                    showToast('Could not load project', 'error');
                    navigate('/projects');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProject();
        }
    }, [id, loadProject, navigate, showToast, currentProject]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[rgb(var(--color-bg-primary))] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return <AppLayout />;
};
