import { Model, Sequelize, DataTypes } from "sequelize";

export class plans extends Model {
  declare id: number;
  declare title: string;
  declare price_kopecks: number;
  declare duration_months: number;
  declare device_limit: number;
  declare accent: boolean;
  declare active: boolean;

  static initModel(sequelize: Sequelize) {
    plans.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        price_kopecks: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        duration_months: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        device_limit: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        accent: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      },
      {
        sequelize: sequelize,
        tableName: "plans",
      },
    );
  }
}
