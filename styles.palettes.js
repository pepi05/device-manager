const standardColors = {
  primaryBlue: '#1976D2',
  primaryBlue10: '#E8F2FB',
  primaryBlue20: '#D1E4F6',
  primaryBlue40: '#A3C8ED',
  primaryBlue60: '#75ADE4',
  primaryBlue80: '#4791DB',
  primaryBlue125: '#13589D',
  primaryBlue150: '#0C3B69',
  primaryBlue175: '#061D34',
  
  primaryOrange: '#D48D17',
  primaryOrange10: '#FBF4E8',
  primaryOrange20: '#F6E8D1',
  primaryOrange40: '#EED1A2',
  primaryOrange60: '#E5BB74',
  primaryOrange80: '#DDA445',
  primaryOrange125: '#9F6A11',
  primaryOrange150: '#6A460B',
  primaryOrange175: '#352306',
  
  accentGreen: '#1CBA88',
  accentGreen10: '#E8F2FB',
  accentGreen20: '#D2F1E7',
  accentGreen40: '#A4E3CF',
  accentGreen60: '#77D6B8',
  accentGreen80: '#49C8A0',
  accentGreen125:'#158B66',
  accentGreen150: '#0E5D44',
  accentGreen175: '#072E22',
  
  accentPurple: '#681DD6',
  accentPurple10: '#F0E9FB',
  accentPurple20: '#E1D2F7',
  accentPurple40: '#C3A5EF',
  accentPurple60: '#A477E6',
  accentPurple80: '#864ADE',
  accentPurple125: '#4E16A0',
  accentPurple150: '#340E6B',
  accentPurple175: '#1A0735',
  
  alertSuccess: '#27A752',
  alertWarning: '#DFB42F',
  alertError: '#E5463B',
  
  gray100: '#222222',
  gray95: '#2D2D2D',
  gray80: '#4E4E4E',
  gray65: '#6F6F6F',
  gray50: '#919191',
  gray35: '#B2B2B2',
  gray20: '#D3D3D3',
  gray10: '#E9E9E9',
  gray5: '#F4F4F4',
  gray2: '#FBFBFB ',
};

const palettes = {
 accent: {
    normal: '#D48D17',
    v10: '#FBF4E8',
    v20: '#F6E8D1',
    v40: '#EED1A2',
    v60: '#E5BB74',
    v80: '#DDA445',
    v125: '#9F6A11',
    v150: '#6A460B',
    v175: '#352306'
  },

  accent1: {
    normal: '#681DD6',
    v10: '#F0E9FB',
    v20: '#E1D2F7',
    v40: '#C3A5EF',
    v60: '#A477E6',
    v80: '#864ADE',
    v125: '#4E16A0',
    v150: '#340E6B',
    v175: '#1A0735'
  },

  accent2: {
    normal: '#1CBA88',
    v10: '#E8F2FB',
    v20: '#D2F1E7',
    v40: '#A4E3CF',
    v60: '#77D6B8',
    v80: '#49C8A0',
    v125: '#158B66',
    v150: '#0E5D44',
    v175: '#072E22'
  },

  alert: {
    success: '#27A752',
    warning: '#DFB42F',
    error: '#E5463B'
  },

  gray: {
    v100: '#222222',
    v95: '#2D2D2D',
    v80: '#4E4E4E',
    v65: '#6F6F6F',
    v50: '#919191',
    v35: '#B2B2B2',
    v20: '#D3D3D3',
    v10: '#E9E9E9',
    v5: '#F4F4F4',
    v2: '#FBFBFB'
  },

  primary: {
    black: '#000000',
    normal: '#1976D2',
    v10: '#E8F2FB',
    v20: '#D1E4F6',
    v40: '#A3C8ED',
    v60: '#75ADE4',
    v80: '#4791DB',
    v125: '#13589D',
    v150: '#0C3B69',
    v175: '#061D34',
    white: '#ffffff'
  },

  dark: {
    background: '#061D34',
    border: '#fff',
    buttonPrimary: '#1976D2',
    buttonPrimaryBorderColor: '#061D34',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondary: '#D48D17',
    buttonSecondaryBorderColor: '#9F6A11',
    buttonSecondaryText: '#FFFFFF',
    buttonTertiary: '#0C3B69',
    buttonTertiaryBorderColor: '#061D34',
    buttonTertiaryText: '#FFFFFF',
    currentOrganizationBackgroundColor: '#0C3B69',
    inputBackgroundColor: '#0C3B69',
    listItemIconColor: '#D1E4F6',
    shell: '#0C3B69',
    shellNavColor: '#D1E4F6',
    shellTextColor: '#FFFFFF',
    toggleColor: '#F3F3F3',
    name: 'dark',
    inputBackground: standardColors.primaryBlue125
  },

  light: {
    background: '#F5F5F5',
    border: '#D48D17',
    buttonPrimary: '#1976D2',
    buttonPrimaryBorderColor: '#061D34',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondary: '#D48D17',
    buttonSecondaryBorderColor: '#9F6A11',
    buttonSecondaryText: '#FFFFFF',
    buttonTertiary: '#D9DBD9',
    buttonTertiaryBorderColor: '#454545',
    buttonTertiaryText: '#000000',
    currentOrganizationBackgroundColor: '#1976D2',
    inputBackgroundColor: '#FFFFFF',
    listItemIconColor: '#1976D2',
    shell: '#FFFFFF',
    shellNavColor: '#D48D17',
    shellTextColor: '#000000',
    toggleColor: '#000000',
    name: 'light',
    inputBackground: standardColors.primaryBlue20
  },
};

export default palettes;