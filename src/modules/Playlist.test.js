import { render, screen } from '@testing-library/react';
import Playlist from './Playlist';

test('renders playlist header', () => {
    const mockSelectedTracks = [
        { name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
        { name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
        // Add more mock tracks if needed
    ];

    const mockOnRemove = jest.fn();
    const mockCreatePlaylist = jest.fn();

    const { getByText } = render(
        <Playlist
            selectedTracks={mockSelectedTracks}
            onRemove={mockOnRemove}
            createPlaylist={mockCreatePlaylist}
        />
    );

    const headerElements = screen.getAllByTestId('playlist-header');
    headerElements.forEach(element => {
        expect(element).toBeInTheDocument();
    });
});
