import TechMemberModel from '../models/techMemberModel.js';
import SalesMemberModel from '../models/salesMemberModel.js';
import MarketingMemberModel from '../models/marketingMemberModel.js';
import LeadModel from '../models/leadModel.js'; 

// Function to return the member model by team
export const getMemberModelByTeam = (team) => {
  switch (team) {
    case 'Tech':
      return TechMemberModel; // Tech team model
    case 'Sales':
      return SalesMemberModel; // Sales team model
    case 'Marketing':
      return MarketingMemberModel; // Marketing team model
    default:
      throw new Error('Invalid team');
  }
};

// Function to return the model based on team and type (member or lead)
export const getModelByTeamAndType = (team, type) => {
  if (type === 'lead') {
    return LeadModel; // Return LeadModel for leads
  }
  return getMemberModelByTeam(team); // Return member model for members
};
