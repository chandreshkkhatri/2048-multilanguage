import { useEffect } from 'react';
import { Platform } from 'react-native';

const useKeyboardControls = (onMove, moveTypes) => {
    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    event.preventDefault();
                    onMove(moveTypes.UP);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    event.preventDefault();
                    onMove(moveTypes.DOWN);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    event.preventDefault();
                    onMove(moveTypes.LEFT);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    event.preventDefault();
                    onMove(moveTypes.RIGHT);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onMove, moveTypes]);
};

export default useKeyboardControls;
