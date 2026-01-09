import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { CharacterCard } from './CharacterCard';
import { CharacterForm } from './CharacterForm';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const CharacterPanel = () => {
    const { characters } = useApp();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCharacter, setEditingCharacter] = useState(null);

    const handleEdit = (character) => {
        setEditingCharacter(character);
        setIsFormOpen(true);
    };

    const handleClose = () => {
        setIsFormOpen(false);
        setEditingCharacter(null);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[rgb(var(--color-border))]">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">Characters</h2>
                    <Button
                        size="sm"
                        icon={Plus}
                        onClick={() => setIsFormOpen(true)}
                    >
                        Add
                    </Button>
                </div>
                <p className="text-sm text-secondary">
                    {characters.length} character{characters.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Character List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {characters.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">👤</div>
                        <h3 className="text-lg font-medium text-primary mb-2">No characters yet</h3>
                        <p className="text-sm text-secondary mb-4">
                            Create your first character to start building your story
                        </p>
                        <Button
                            variant="outline"
                            icon={Plus}
                            onClick={() => setIsFormOpen(true)}
                        >
                            Create Character
                        </Button>
                    </div>
                ) : (
                    characters.map(character => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>

            {/* Character Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleClose}
                title={editingCharacter ? 'Edit Character' : 'Create New Character'}
                size="lg"
            >
                <CharacterForm
                    character={editingCharacter}
                    onClose={handleClose}
                />
            </Modal>
        </div>
    );
};
