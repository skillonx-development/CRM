// controllers/csvImportController.js
import Papa from 'papaparse';
import College from '../models/collegeModel.js';
import School from '../models/schoolModel.js';
// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to clean and validate data
const cleanData = (data) => {
  const cleaned = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      cleaned[key] = value.trim();
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
};

// Helper function to process array fields (contact, branches)
const processArrayField = (field) => {
  if (!field) return [];
  
  if (typeof field === 'string') {
    // Split by semicolon and filter out empty values
    return field.split(';')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }
  
  return Array.isArray(field) ? field : [];
};

// Import CSV data
export const importCSV = async (req, res) => {
  try {
    const { importType } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No CSV file uploaded'
      });
    }

    if (!importType || !['college', 'school'].includes(importType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid import type. Must be "college" or "school"'
      });
    }

    // Parse CSV file
    const csvData = req.file.buffer.toString('utf8');
    const parseResult = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
    });

    if (parseResult.errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'CSV parsing error',
        errors: parseResult.errors
      });
    }

    const data = parseResult.data;
    
    if (data.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'CSV file is empty or has no valid data'
      });
    }

    let imported = 0;
    let skipped = 0;
    const errors = [];

    // Process each row
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNumber = i + 2; // +2 because CSV starts from row 2 (header is row 1)

      try {
        const cleanedRow = cleanData(row);

        // Validate required fields
        if (!cleanedRow.name || !cleanedRow.principal || !cleanedRow.email) {
          errors.push(`Row ${rowNumber}: Missing required fields (name, principal, email)`);
          skipped++;
          continue;
        }

        // Validate email format
        if (!isValidEmail(cleanedRow.email)) {
          errors.push(`Row ${rowNumber}: Invalid email format`);
          skipped++;
          continue;
        }

        if (importType === 'college') {
          // Check if college already exists
          const existingCollege = await College.findOne({ 
            $or: [
              { email: cleanedRow.email },
              { name: cleanedRow.name }
            ]
          });

          if (existingCollege) {
            skipped++;
            continue;
          }

          // Prepare college data
          const collegeData = {
            name: cleanedRow.name,
            principal: cleanedRow.principal,
            email: cleanedRow.email,
            website: cleanedRow.website || '',
            type: cleanedRow.type || cleanedRow.collegetype || 'engineering',
            tier: cleanedRow.tier || 'tier3',
            placementOfficer: cleanedRow.placementofficer || cleanedRow.placement_officer || '',
            placementEmail: cleanedRow.placementemail || cleanedRow.placement_email || '',
            branches: processArrayField(cleanedRow.branches),
            contact: processArrayField(cleanedRow.contact),
            address: cleanedRow.address || '',
            stateId: cleanedRow.stateid || cleanedRow.state_id || '',
            stateName: cleanedRow.statename || cleanedRow.state_name || '',
            district: cleanedRow.district || ''
          };

          // Create new college
          const college = new College(collegeData);
          await college.save();
          imported++;

        } else if (importType === 'school') {
          // Check if school already exists
          const existingSchool = await School.findOne({ 
            $or: [
              { email: cleanedRow.email },
              { name: cleanedRow.name }
            ]
          });

          if (existingSchool) {
            skipped++;
            continue;
          }

          // Prepare school data
          const schoolData = {
            name: cleanedRow.name,
            principal: cleanedRow.principal,
            email: cleanedRow.email,
            website: cleanedRow.website || '',
            contact: processArrayField(cleanedRow.contact),
            address: cleanedRow.address || '',
            stateId: cleanedRow.stateid || cleanedRow.state_id || '',
            stateName: cleanedRow.statename || cleanedRow.state_name || '',
            district: cleanedRow.district || ''
          };

          // Create new school
          const school = new School(schoolData);
          await school.save();
          imported++;
        }

      } catch (error) {
        console.error(`Error processing row ${rowNumber}:`, error);
        errors.push(`Row ${rowNumber}: ${error.message}`);
        skipped++;
      }
    }

    // Return response
    res.status(200).json({
      success: true,
      message: `Import completed successfully`,
      imported,
      skipped,
      total: data.length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('CSV Import Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during CSV import',
      error: error.message
    });
  }
};

// Get import template
export const getImportTemplate = async (req, res) => {
  try {
    const { type } = req.params;

    let templateData = {};

    if (type === 'college') {
      templateData = {
        name: 'Sample College Name',
        principal: 'Dr. Sample Principal',
        email: 'principal@samplecollege.edu',
        website: 'https://samplecollege.edu',
        type: 'engineering',
        tier: 'tier1',
        placementOfficer: 'Placement Officer Name',
        placementEmail: 'placement@samplecollege.edu',
        branches: 'Computer Science;Mechanical Engineering;Electrical Engineering',
        contact: '1234567890;0987654321',
        address: 'Sample Address, City, State, PIN',
        stateId: '16',
        stateName: 'Karnataka',
        district: 'Mysore'
      };
    } else if (type === 'school') {
      templateData = {
        name: 'Sample School Name',
        principal: 'Sample Principal',
        email: 'principal@sampleschool.edu',
        website: 'https://sampleschool.edu',
        contact: '1234567890;0987654321',
        address: 'Sample Address, City, State, PIN',
        stateId: '16',
        stateName: 'Karnataka',
        district: 'Mysore'
      };
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid template type. Must be "college" or "school"'
      });
    }

    // Convert to CSV format
    const csv = Papa.unparse([templateData]);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${type}_import_template.csv"`);
    res.send(csv);

  } catch (error) {
    console.error('Template Generation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating template',
      error: error.message
    });
  }
};

