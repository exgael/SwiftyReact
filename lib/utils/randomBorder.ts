/**
 * Generates a random hex color.
 * @returns {string} A random hex color.
 */
const getRandomHexColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

/**
 * Generates a border style with a random color.
 * @returns {string} A CSS border style string.
 */
export const getRandomBorderStyle = (): string => {
    const randomColor = getRandomHexColor();
    return `1px solid ${randomColor}`;
};
