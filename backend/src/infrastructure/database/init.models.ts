import { User } from "./models/user.model.js";
import { plans } from "./models/plans.model.js";
import { pricingConfig } from "./models/pricingConfig.model.js";
import { Setting } from "./models/settings.model.js";
import { subscriptions } from "./models/subscriptions.model.js";
import { BalanceTransaction } from "./models/balanceTransaction.model.js";

export function setupAssociations() {
  User.hasMany(BalanceTransaction, { foreignKey: "user_id", onDelete: "RESTRICT", as: "balanceTransactions" });
  BalanceTransaction.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", as: "user" });
}
export const models = [User, plans, pricingConfig, Setting, subscriptions, BalanceTransaction];
