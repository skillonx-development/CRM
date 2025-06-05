// controllers/exportController.js
import ExcelJS from 'exceljs';

// Helper function to format contact numbers
const formatContacts = (contacts) => {
  if (!contacts || !Array.isArray(contacts)) return '';
  return contacts.filter(contact => contact && contact.trim() !== '').join(', ');
};

// Helper function to format branches
const formatBranches = (branches) => {
  if (!branches || !Array.isArray(branches)) return '';
  return branches.filter(branch => branch && branch.trim() !== '').join(', ');
};

// Helper function to format tier
const formatTier = (tier) => {
  if (!tier) return '';
  return tier.charAt(0).toUpperCase() + tier.slice(1).replace('tier', ' ');
};

// Helper function to style the worksheet
const styleWorksheet = (worksheet, isCollege = true) => {
  // Style header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: isCollege ? '366092' : '4CAF50' } // Blue for colleges, Green for schools
  };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.height = 25;

  // Auto-fit columns
  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = Math.min(Math.max(maxLength + 2, 12), 50); // Min 12, Max 50
  });

  // Add borders to all cells
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      
      // Alternate row colors
      if (rowNumber > 1 && rowNumber % 2 === 0) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F8F9FA' }
        };
      }
    });
  });
};

// Export colleges to Excel
export const exportColleges = async (req, res) => {
  try {
    // Your frontend sends { data: [...], filters: {...} }
    const { data: colleges, filters } = req.body;
    
    if (!colleges || !Array.isArray(colleges) || colleges.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No college data provided' 
      });
    }

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Colleges');

    // Define headers for colleges based on your data structure
    const headers = [
      'S.No',
      'College Name',
      'Principal',
      'Email',
      'Placement Officer',
      'Placement Email',
      'College Type',
      'Tier',
      'Contact Numbers',
      'Branches',
      'Address',
      'State',
      'District'
    ];

    // Add headers
    worksheet.addRow(headers);

    // Add data rows
    colleges.forEach((college, index) => {
      const row = [
        index + 1,
        college.name || '',
        college.principal || '',
        college.email || '',
        college.placementOfficer || '',
        college.placementEmail || '',
        college.type || college.collegeType || '',
        formatTier(college.tier),
        formatContacts(college.contact),
        formatBranches(college.branches),
        college.address || '',
        college.stateName || '',
        college.district || ''
      ];
      worksheet.addRow(row);
    });

    // Style the worksheet
    styleWorksheet(worksheet, true);

    // Add filter information if filters were applied
    if (filters && Object.keys(filters).some(key => filters[key])) {
      const filterInfo = [];
      if (filters.search) filterInfo.push(`Name: "${filters.search}"`);
      if (filters.placeSearch) filterInfo.push(`Location: "${filters.placeSearch}"`);
      if (filters.tierFilter) filterInfo.push(`Tier: ${formatTier(filters.tierFilter)}`);
      
      if (filterInfo.length > 0) {
        worksheet.getCell('A1').note = `Filters Applied: ${filterInfo.join(', ')}`;
      }
    }

    // Set response headers
    const timestamp = new Date().toISOString().split('T')[0];
    const filterSuffix = (filters && Object.keys(filters).some(key => filters[key])) ? '_filtered' : '';
    const filename = `colleges_data${filterSuffix}_${timestamp}.xlsx`;
    
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}`
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error exporting colleges:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to export colleges',
      error: error.message 
    });
  }
};

// Export schools to Excel
export const exportSchools = async (req, res) => {
  try {
    // Your frontend sends { data: [...], filters: {...} }
    const { data: schools, filters } = req.body;
    
    if (!schools || !Array.isArray(schools) || schools.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No school data provided' 
      });
    }

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Schools');

    // Define headers for schools based on your data structure
    const headers = [
      'S.No',
      'School Name',
      'Principal',
      'Email',
      'Contact Numbers',
      'Address',
      'State',
      'District'
    ];

    // Add headers
    worksheet.addRow(headers);

    // Add data rows
    schools.forEach((school, index) => {
      const row = [
        index + 1,
        school.name || '',
        school.principal || '',
        school.email || '',
        formatContacts(school.contact),
        school.address || '',
        school.stateName || '',
        school.district || ''
      ];
      worksheet.addRow(row);
    });

    // Style the worksheet
    styleWorksheet(worksheet, false);

    // Add filter information if filters were applied
    if (filters && Object.keys(filters).some(key => filters[key])) {
      const filterInfo = [];
      if (filters.search) filterInfo.push(`Name: "${filters.search}"`);
      if (filters.placeSearch) filterInfo.push(`Location: "${filters.placeSearch}"`);
      
      if (filterInfo.length > 0) {
        worksheet.getCell('A1').note = `Filters Applied: ${filterInfo.join(', ')}`;
      }
    }

    // Set response headers
    const timestamp = new Date().toISOString().split('T')[0];
    const filterSuffix = (filters && Object.keys(filters).some(key => filters[key])) ? '_filtered' : '';
    const filename = `schools_data${filterSuffix}_${timestamp}.xlsx`;
    
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}`
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error exporting schools:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to export schools',
      error: error.message 
    });
  }
};

// Export combined data (colleges and schools) to Excel with multiple sheets
export const exportCombined = async (req, res) => {
  try {
    const { colleges, schools, filters } = req.body;
    
    if ((!colleges || colleges.length === 0) && (!schools || schools.length === 0)) {
      return res.status(400).json({ 
        success: false, 
        message: 'No data provided for export' 
      });
    }

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add colleges sheet if data exists
    if (colleges && colleges.length > 0) {
      const collegesWorksheet = workbook.addWorksheet('Colleges');
      
      const collegeHeaders = [
        'S.No', 'College Name', 'Principal', 'Email', 'Placement Officer',
        'Placement Email', 'College Type', 'Tier', 'Contact Numbers', 
        'Branches', 'Address', 'State', 'District'
      ];
      
      collegesWorksheet.addRow(collegeHeaders);
      
      colleges.forEach((college, index) => {
        const row = [
          index + 1,
          college.name || '',
          college.principal || '',
          college.email || '',
          college.placementOfficer || '',
          college.placementEmail || '',
          college.type || college.collegeType || '',
          formatTier(college.tier),
          formatContacts(college.contact),
          formatBranches(college.branches),
          college.address || '',
          college.stateName || '',
          college.district || ''
        ];
        collegesWorksheet.addRow(row);
      });
      
      styleWorksheet(collegesWorksheet, true);
    }

    // Add schools sheet if data exists
    if (schools && schools.length > 0) {
      const schoolsWorksheet = workbook.addWorksheet('Schools');
      
      const schoolHeaders = [
        'S.No', 'School Name', 'Principal', 'Email', 'Contact Numbers',
        'Address', 'State', 'District'
      ];
      
      schoolsWorksheet.addRow(schoolHeaders);
      
      schools.forEach((school, index) => {
        const row = [
          index + 1,
          school.name || '',
          school.principal || '',
          school.email || '',
          formatContacts(school.contact),
          school.address || '',
          school.stateName || '',
          school.district || ''
        ];
        schoolsWorksheet.addRow(row);
      });
      
      styleWorksheet(schoolsWorksheet, false);
    }

    // Set response headers
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `combined_export_${timestamp}.xlsx`;
    
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}`
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error exporting combined data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to export combined data',
      error: error.message 
    });
  }
};

// Export filtered data based on request body
export const exportFiltered = async (req, res) => {
  try {
    const { 
      data, 
      type, // 'colleges' or 'schools'
      filters = {} 
    } = req.body;
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No data provided for export' 
      });
    }

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const isCollege = type === 'colleges';
    const worksheetName = isCollege ? 'Filtered Colleges' : 'Filtered Schools';
    const worksheet = workbook.addWorksheet(worksheetName);

    // Define headers based on type
    const headers = isCollege ? [
      'S.No', 'College Name', 'Principal', 'Email', 'Placement Officer',
      'Placement Email', 'College Type', 'Tier', 'Contact Numbers', 
      'Branches', 'Address', 'State', 'District'
    ] : [
      'S.No', 'School Name', 'Principal', 'Email', 'Contact Numbers',
      'Address', 'State', 'District'
    ];

    // Add headers
    worksheet.addRow(headers);

    // Add data rows
    data.forEach((item, index) => {
      const row = isCollege ? [
        index + 1,
        item.name || '',
        item.principal || '',
        item.email || '',
        item.placementOfficer || '',
        item.placementEmail || '',
        item.type || item.collegeType || '',
        formatTier(item.tier),
        formatContacts(item.contact),
        formatBranches(item.branches),
        item.address || '',
        item.stateName || '',
        item.district || ''
      ] : [
        index + 1,
        item.name || '',
        item.principal || '',
        item.email || '',
        formatContacts(item.contact),
        item.address || '',
        item.stateName || '',
        item.district || ''
      ];
      worksheet.addRow(row);
    });

    // Style the worksheet
    styleWorksheet(worksheet, isCollege);

    // Add filter information as a comment if filters were applied
    if (Object.keys(filters).some(key => filters[key])) {
      const filterInfo = [];
      if (filters.search) filterInfo.push(`Name: "${filters.search}"`);
      if (filters.placeSearch) filterInfo.push(`Location: "${filters.placeSearch}"`);
      if (filters.tierFilter && isCollege) filterInfo.push(`Tier: ${formatTier(filters.tierFilter)}`);
      
      if (filterInfo.length > 0) {
        worksheet.getCell('A1').note = `Filters Applied: ${filterInfo.join(', ')}`;
      }
    }

    // Set response headers
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${type}_filtered_export_${timestamp}.xlsx`;
    
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}`
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error exporting filtered data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to export filtered data',
      error: error.message 
    });
  }
};

// Get export statistics
export const getExportStats = async (req, res) => {
  try {
    // This would typically fetch from your database
    // For now, returning mock statistics
    const stats = {
      totalExports: 150,
      collegeExports: 85,
      schoolExports: 65,
      lastExportDate: new Date().toISOString(),
      popularFormats: {
        excel: 95,
        csv: 5
      }
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching export stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch export statistics',
      error: error.message 
    });
  }
};

// Unified export function for backward compatibility
export const exportToExcel = async (req, res) => {
  try {
    const { type, colleges, schools, data, filters } = req.body;
    
    switch (type) {
      case 'colleges':
        return exportColleges(req, res);
      case 'schools':
        return exportSchools(req, res);
      case 'combined':
        return exportCombined(req, res);
      case 'filtered':
        return exportFiltered(req, res);
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid export type. Use: colleges, schools, combined, or filtered'
        });
    }
  } catch (error) {
    console.error('Error in unified export:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to export data',
      error: error.message 
    });
  }
};