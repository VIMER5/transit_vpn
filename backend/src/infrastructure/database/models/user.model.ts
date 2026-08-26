import { Model, DataTypes, Sequelize, NonAttribute } from "sequelize";
export class User extends Model {
  declare id: number;
  declare tg_id: bigint;
  declare referral_code: string;
  declare referred_by_id: bigint;
  declare status: "active" | "banned";
  declare dalance: number;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        tg_id: { type: DataTypes.BIGINT, allowNull: false, unique: true },
        referral_code: { type: DataTypes.STRING(16), unique: true },
        referred_by_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: null,
        },
        status: { type: DataTypes.ENUM("active", "banned"), allowNull: false, defaultValue: "active" },
        balance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      },
      { sequelize: sequelize, tableName: "users" },
    );
  }
}
