import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Clock, MoreVertical, Play, Trash, Edit } from 'lucide-react';
import { api } from '../services/api';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/common/Button';

export const ProjectsDashboard = () => {
    const navigate = useNavigate();
    const { user, logout, showToast } = useApp();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // New Project Form
    const [newProjectName, setNewProjectName] = useState('');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await api.projects.getAll();
            setProjects(data);
        } catch (error) {
            showToast('Failed to load projects', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        if (!newProjectName.trim()) return;

        try {
            const newProject = await api.projects.create(
                newProjectName,
                '',
                { characters: [], locations: [], scenes: [] } // Initial empty state
            );
            showToast('Project created!', 'success');
            navigate(`/project/${newProject.id}`);
        } catch (error) {
            showToast('Failed to create project', 'error');
        }
    };

    const handleDeleteProject = async (e, id) => {
        e.stopPropagation(); // Prevent opening project
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            await api.projects.delete(id);
            setProjects(projects.filter(p => p.id !== id));
            showToast('Project deleted', 'success');
        } catch (error) {
            showToast('Failed to delete project', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[rgb(var(--color-bg-primary))]/90 backdrop-blur-md border-b border-[rgb(var(--color-border))]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500">
                            <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                        <span className="text-xl font-bold gradient-text">Veo Studio</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-secondary">
                            {user?.email}
                        </span>
                        <Button variant="ghost" size="sm" onClick={logout}>Log Out</Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero / Welcome */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">My Projects</h1>
                        <p className="text-secondary text-lg">Continue where you left off or start a new story.</p>
                    </div>
                    <Button
                        variant="accent"
                        icon={Plus}
                        onClick={() => setIsCreating(true)}
                    >
                        New Project
                    </Button>
                </div>

                {/* Create Modal */}
                {isCreating && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-xl p-6 w-full max-w-md shadow-2xl">
                            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
                            <form onSubmit={handleCreateProject}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-secondary mb-2">Project Name</label>
                                    <input
                                        type="text"
                                        autoFocus
                                        value={newProjectName}
                                        onChange={(e) => setNewProjectName(e.target.value)}
                                        placeholder="Epic Sci-Fi Adventure"
                                        className="w-full bg-[rgb(var(--color-bg-tertiary))] border border-[rgb(var(--color-border))] rounded-lg py-3 px-4 text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                                    <Button variant="primary" type="submit" disabled={!newProjectName.trim()}>Create Project</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Projects Grid */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-[rgb(var(--color-border))] rounded-2xl bg-[rgb(var(--color-bg-secondary))]/50">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-bg-tertiary))] mb-4">
                            <Plus className="w-8 h-8 text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No projects yet</h3>
                        <p className="text-secondary mb-6 max-w-xs mx-auto">Create your first cinematic masterpiece today.</p>
                        <Button variant="primary" onClick={() => setIsCreating(true)}>Create First Project</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                to={`/project/${project.id}`}
                                className="group relative bg-[rgb(var(--color-bg-secondary))] rounded-xl overflow-hidden border border-[rgb(var(--color-border))] hover:border-primary-500/50 transition-all hover:shadow-xl hover:-translate-y-1 block h-full flex flex-col"
                            >
                                {/* Thumbnail Placeholder */}
                                <div className="aspect-video bg-[rgb(var(--color-bg-tertiary))] relative overflow-hidden">
                                    {project.thumbnail_url ? (
                                        <img src={project.thumbnail_url} alt={project.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-tertiary">
                                            <Play className="w-12 h-12 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium border border-white/20">Open Project</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary-400 transition-colors line-clamp-2">{project.name}</h3>
                                        <button
                                            onClick={(e) => handleDeleteProject(e, project.id)}
                                            className="text-tertiary hover:text-red-500 transition-colors p-1 -mr-2"
                                            title="Delete Project"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-secondary text-sm line-clamp-2 mb-4">{project.description || 'No description'}</p>

                                    <div className="mt-auto flex items-center gap-2 text-xs text-tertiary">
                                        <Clock className="w-3 h-3" />
                                        <span>Edited {new Date(project.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
