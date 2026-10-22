import { Model, Sequelize, DataTypes } from "sequelize";

export class pricingConfig extends Model {
  declare id: number;
  declare device_month_rate_kopecks: number;
  declare cost_month_kopecks: number;
  declare max_device: number;

  static initModel(sequelize: Sequelize) {
    pricingConfig.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        device_month_rate_kopecks: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        cost_month_kopecks: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        max_device: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      },
      {
        sequelize: sequelize,
        tableName: "pricingConfig",
      },
    );
  }
}
