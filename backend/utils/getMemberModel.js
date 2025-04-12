// utils/getMemberModel.js
import TechMember from "../models/techMemberModel.js";
import SalesMember from "../models/salesMemberModel.js";
import MarketingMember from "../models/marketingMemberModel.js";

export const getMemberModelByTeam = (team) => {
  switch (team.toLowerCase()) {
    case "tech":
      return TechMember;
    case "sales":
      return SalesMember;
    case "marketing":
      return MarketingMember;
    default:
      return null;
  }
};
