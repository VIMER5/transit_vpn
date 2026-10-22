import { Model, Sequelize, DataTypes } from "sequelize";

export class subPeriods extends Model {
  declare id: number;
  declare months: number;
  declare discount_percent: number;
  declare is_active: boolean;

  static initModel(sequelize: Sequelize) {
    subPeriods.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        months: { type: DataTypes.INTEGER, allowNull: false, unique: true },
        discount_percent: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
            min: 0,
            max: 100,
          },
        },
        is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      },
      {
        sequelize: sequelize,
        tableName: "subPeriods",
        timestamps: false,
      },
    );
  }
}
