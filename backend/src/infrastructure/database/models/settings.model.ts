import { Model, Sequelize, DataTypes } from "sequelize";

export class Setting extends Model {
  declare key: string;
  declare value: string;

  static initModel(sequelize: Sequelize) {
    Setting.init(
      {
        key: { type: DataTypes.STRING, primaryKey: true },
        value: { type: DataTypes.TEXT, allowNull: true },
      },
      {
        sequelize: sequelize,
        tableName: "setting",
        timestamps: false,
      },
    );
  }
}
