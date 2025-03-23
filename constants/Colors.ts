const tintColorLight = '#0055A5'; // Cathay blue
const tintColorDark = '#4D90CD'; // Lighter blue for dark mode

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary: '#0055A5', // Primary blue
    secondary: '#003366', // Darker blue
    accent: '#FF9E1B', // Gold accent
    lightGray: '#f4f4f4',
  },
  dark: {
    text: '#fff',
    background: '#121212',
    tint: tintColorDark,
    tabIconDefault: '#666',
    tabIconSelected: tintColorDark,
    primary: '#4D90CD', // Lighter blue
    secondary: '#2D5F9A', // Medium blue
    accent: '#FFC44D', // Lighter gold
    lightGray: '#292929',
  },
};