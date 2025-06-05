// utils/excelUtils.js
const ExcelJS = require('exceljs');

// Color schemes for different data types
const COLOR_SCHEMES = {
  colleges: {
    primary: '366092',
    background: 'E3F2FD',
    alternateRow: 'F8F9FA'
  },
  schools: {
    primary: '4CAF50',
    background: 'E8F5E8',
    alternateRow: 'F0F8F0'
  }
};

// Validation functions
const validateData = (data, type) => {
  if (!data || !Array.isArray(data)) {
    throw new Error('Data must be an array');
  }

  if (data.length === 0) {
    throw new Error(`No ${type} data available for export`);
  }

  return true;
};

// Data sanitization
const sanitizeData = (data, type) => {
  return data.map(item => {
    const sanitized = {};
    
    // Common fields
    sanitized.name = item.name || 'N/A';
    sanitized.principal = item.principal || 'N/A';
    sanitized.email = item.email || 'N/A';
    sanitized.contact = Array.isArray(item.contact) 
      ? item.contact.filter(c => c && c.trim()).join(', ') 
      : 'N/A';
    sanitized.address = item.address || 'N/A';
    sanitized.stateName = item.stateName || 'N/A';
    sanitized.district = item.district || 'N/A';

    // College-specific fields
    if (type === 'colleges') {
      sanitized.type = item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'N/A';
      sanitized.placementOfficer = item.placementOfficer || 'N/A';
      sanitized.placementEmail = item.placementEmail || 'N/A';
      sanitized.branches = Array.isArray(item.branches) 
        ? item.branches.filter(b => b && b.trim()).join(', ') 
        : 'N/A';
      sanitized.tier = item.tier ? item.tier.charAt(0).toUpperCase() + item.tier.slice(1) : 'N/A';
    }

    return sanitized;
  });
};

// Advanced cell formatting
const formatCell = (cell, value, type = 'text') => {
  cell.value = value;
  
  switch (type) {
    case 'email':
      if (value && value !== 'N/A' && value.includes('@')) {
        cell.value = {
          text: value,
          hyperlink: `mailto:${value}`
        };
        cell.font = { color: { argb: '0066CC' }, underline: true };
      }
      break;
      
    case 'phone':
      if (value && value !== 'N/A') {
        cell.alignment = { horizontal: 'left' };
        cell.numFmt = '@'; // Text format to preserve leading zeros
      }
      break;
      
    case 'header':
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      break;
      
    case 'number':
      cell.alignment = { horizontal: 'center' };
      break;
      
    default:
      cell.alignment = { horizontal: 'left', vertical: 'middle' };
  }
};

// Generate summary statistics
const generateSummary = (data, type) => {
  const summary = {
    total: data.length,
    exportDate: new Date().toLocaleDateString('en-IN'),
    exportTime: new Date().toLocaleTimeString('en-IN')
  };

  if (type === 'colleges') {
    // College type distribution
    const typeCount = data.reduce((acc, college) => {
      const collegeType = college.type || 'Unknown';
      acc[collegeType] = (acc[collegeType] || 0) + 1;
      return acc;
    }, {});

    // Tier distribution
    const tierCount = data.reduce((acc, college) => {
      const tier = college.tier || 'Unspecified';
      acc[tier] = (acc[tier] || 0) + 1;
      return acc;
    }, {});

    summary.typeDistribution = typeCount;
    summary.tierDistribution = tierCount;
  }

  // State distribution
  const stateCount = data.reduce((acc, item) => {
    const state = item.stateName || 'Unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  summary.stateDistribution = stateCount;

  return summary;
};

// Create protection options for the worksheet
const addWorksheetProtection = (worksheet) => {
  worksheet.protect('institution-data-2024', {
    selectLockedCells: true,
    selectUnlockedCells: true,
    formatCells: false,
    formatColumns: false,
    formatRows: false,
    insertRows: false,
    insertColumns: false,
    insertHyperlinks: false,
    deleteRows: false,
    deleteColumns: false,
    sort: false,
    autoFilter: false,
    pivotTables: false
  });
};

module.exports = {
  COLOR_SCHEMES,
  validateData,
  sanitizeData,
  formatCell,
  generateSummary,
  addWorksheetProtection
};