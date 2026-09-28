import { Transaction } from "sequelize";

export interface TxOptions {
  transaction?: Transaction;
}
