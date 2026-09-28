import { Model, Sequelize, DataTypes } from "sequelize";
import { TypesBalanceTransaction } from "../../../shared/types/payment.type.js";

export class BalanceTransaction extends Model {
  declare id: number;
  declare user_id: number;
  declare amount_kopecks: number;
  declare type: TypesBalanceTransaction;
  declare reference_id: number;
  declare balance_after: number;
  declare note: string;

  static initModel(sequelize: Sequelize) {
    BalanceTransaction.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        amount_kopecks: { type: DataTypes.INTEGER, allowNull: false },
        type: {
          type: DataTypes.ENUM("topup", "purchase", "referral_bonus", "refund", "admin_adjustment"),
          allowNull: false,
        },
        reference_id: { type: DataTypes.INTEGER, allowNull: true },
        balance_after: { type: DataTypes.INTEGER, allowNull: false },
        note: { type: DataTypes.STRING, allowNull: true },
      },
      {
        sequelize: sequelize,
        tableName: "balance_transactions",
        updatedAt: false,
        indexes: [{ fields: ["user_id"] }],
      },
    );
  }
}
