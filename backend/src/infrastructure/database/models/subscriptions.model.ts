import { Model, Sequelize, DataTypes, NonAttribute } from "sequelize";
import { subDevice } from "./subDevice.model.js";

export class subscriptions extends Model {
  declare id: number;
  declare sub_uuid: string;
  declare plan_id: number;
  declare plan_title: string | "custom";
  declare device_limit: number;
  declare price_paid_kopecks: number;
  declare expires_at: Date;
  declare status: "active" | "expired";
  declare expiry_handled_at: Date | null;
  declare notified_3d_at: Date | null;
  declare devices?: NonAttribute<subDevice[]>;

  static initModel(sequelize: Sequelize) {
    subscriptions.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        sub_uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, unique: true },
        plan_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: "plans", key: "id" } },
        plan_title: { type: DataTypes.STRING, allowNull: false, defaultValue: "custom" },
        device_limit: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        price_paid_kopecks: { type: DataTypes.INTEGER, allowNull: false },
        expires_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
        status: { type: DataTypes.ENUM("active", "expired"), allowNull: false, defaultValue: "active" },
        expiry_handled_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
        notified_3d_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
      },
      {
        sequelize: sequelize,
        tableName: "subscriptions",
      },
    );
  }
}
