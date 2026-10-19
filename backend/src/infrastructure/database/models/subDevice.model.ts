import { Model, Sequelize, DataTypes } from "sequelize";

export class subDevice extends Model {
  declare id: number;
  declare sub_id: number;
  declare hwid_hash: string;
  declare agent: string;
  declare deviceName: string;
  declare os: string;

  static initModel(sequelize: Sequelize) {
    subDevice.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        sub_id: { type: DataTypes.INTEGER, allowNull: false },
        hwid_hash: { type: DataTypes.STRING, allowNull: false },
        agent: { type: DataTypes.STRING, allowNull: false },
        deviceName: { type: DataTypes.STRING, allowNull: false },
        os: { type: DataTypes.STRING, allowNull: false },
      },
      {
        sequelize: sequelize,
        tableName: "sub_device",
        indexes: [{ fields: ["sub_id", "hwid_hash"] }],
      },
    );
  }
}
