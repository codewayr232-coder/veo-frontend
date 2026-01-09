import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { LocationCard } from './LocationCard';
import { LocationForm } from './LocationForm';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const LocationPanel = () => {
    const { locations } = useApp();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState(null);

    const handleEdit = (location) => {
        setEditingLocation(location);
        setIsFormOpen(true);
    };

    const handleClose = () => {
        setIsFormOpen(false);
        setEditingLocation(null);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[rgb(var(--color-border))]">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">Locations</h2>
                    <Button
                        size="sm"
                        icon={Plus}
                        onClick={() => setIsFormOpen(true)}
                    >
                        Add
                    </Button>
                </div>
                <p className="text-sm text-secondary">
                    {locations.length} location{locations.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Location List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {locations.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📍</div>
                        <h3 className="text-lg font-medium text-primary mb-2">No locations yet</h3>
                        <p className="text-sm text-secondary mb-4">
                            Define your first location where scenes will take place
                        </p>
                        <Button
                            variant="outline"
                            icon={Plus}
                            onClick={() => setIsFormOpen(true)}
                        >
                            Create Location
                        </Button>
                    </div>
                ) : (
                    locations.map(location => (
                        <LocationCard
                            key={location.id}
                            location={location}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>

            {/* Location Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleClose}
                title={editingLocation ? 'Edit Location' : 'Create New Location'}
                size="lg"
            >
                <LocationForm
                    location={editingLocation}
                    onClose={handleClose}
                />
            </Modal>
        </div>
    );
};
