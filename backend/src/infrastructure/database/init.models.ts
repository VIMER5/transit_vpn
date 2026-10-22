import { User } from "./models/user.model.js";
import { plans } from "./models/plans.model.js";
import { pricingConfig } from "./models/pricingConfig.model.js";
import { Setting } from "./models/settings.model.js";
import { subscriptions } from "./models/subscriptions.model.js";
import { BalanceTransaction } from "./models/balanceTransaction.model.js";
import { subDevice } from "./models/subDevice.model.js";
import { subPeriods } from "./models/subPeriods.model.js";

export function setupAssociations() {
  User.hasMany(BalanceTransaction, { foreignKey: "user_id", onDelete: "RESTRICT", as: "balanceTransactions" });
  BalanceTransaction.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", as: "user" });

  User.hasMany(User, { foreignKey: "referred_by_id", as: "usersReferrals" });
  User.belongsTo(User, { foreignKey: "referred_by_id", as: "invitedUser" });

  subscriptions.hasOne(User, { foreignKey: "sub_id", as: "user" });
  User.belongsTo(subscriptions, { foreignKey: "sub_id", as: "Sub" });

  subscriptions.hasMany(subDevice, { foreignKey: "sub_id", as: "devices" });
  subDevice.belongsTo(subscriptions, { foreignKey: "sub_id", as: "sub" });
}
export const models = [User, plans, pricingConfig, Setting, subscriptions, BalanceTransaction, subDevice, subPeriods];
