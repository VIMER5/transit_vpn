import { Model, DataTypes, Sequelize, NonAttribute } from "sequelize";
import { subscriptions } from "./subscriptions.model.js";
export class User extends Model {
  declare id: bigint;
  declare tg_id: bigint;
  declare first_name: string | null;
  declare last_name: string | null;
  declare username: string | null;
  declare photo_url: string | null;
  declare referral_code: string;
  declare referred_by_id: bigint;
  declare status: "active" | "banned";
  declare balance: number;
  declare sub_id: number;
  declare Sub?: NonAttribute<subscriptions>;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        tg_id: { type: DataTypes.BIGINT, allowNull: false, unique: true },
        first_name: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        last_name: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        username: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        photo_url: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        referral_code: { type: DataTypes.STRING(16), unique: true },
        referred_by_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        status: { type: DataTypes.ENUM("active", "banned"), allowNull: false, defaultValue: "active" },
        balance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        sub_id: { type: DataTypes.INTEGER, allowNull: true },
      },
      { sequelize: sequelize, tableName: "users" },
    );
  }
}
