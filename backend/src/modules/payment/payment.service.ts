import { Transaction } from "sequelize";
import { User } from "../../infrastructure/database/models/user.model.js";
import { TxOptions } from "../../shared/types/global.type.js";
import { TypesBalanceTransaction } from "../../shared/types/payment.type.js";
import userError from "../../shared/errors/user.error.js";
import PaymentError from "../../shared/errors/payment.error.js";
import { BalanceTransaction } from "../../infrastructure/database/models/balanceTransaction.model.js";

class paymentService {
  async getUserHistory(userId: bigint, offset: number, limit: number) {
    const history = await BalanceTransaction.findAll({
      where: { user_id: userId },
      limit,
      offset,
      order: [["id", "DESC"]],
      attributes: { exclude: ["id", "user_id"] },
    });
    return history;
  }

  private async applyBalanceChange(
    userId: bigint,
    signedAmountKopecks: number,
    meta: { type: TypesBalanceTransaction; referenceId?: number },
    options: TxOptions,
  ): Promise<number> {
    const user = await User.findByPk(userId, {
      lock: options.transaction ? Transaction.LOCK.UPDATE : undefined,
      transaction: options.transaction,
    });

    if (!user) throw userError.userNotFound();
    const newBalance = user.balance + signedAmountKopecks;
    if (newBalance < 0) throw PaymentError.InsufficientBalanceError();

    await user.update({ balance: newBalance }, { transaction: options.transaction });

    await BalanceTransaction.create(
      {
        user_id: userId,
        amount_kopecks: signedAmountKopecks,
        type: meta.type,
        reference_id: meta.referenceId ?? null,
        balance_after: newBalance,
      },
      { transaction: options.transaction },
    );
    return newBalance;
  }
  debitBalance = (
    userId: bigint,
    amount: number,
    meta: { type: TypesBalanceTransaction; referenceId?: number },
    options: TxOptions = {},
  ) => this.applyBalanceChange(userId, -amount, meta, options);

  creditBalance = (
    userId: bigint,
    amount: number,
    meta: { type: TypesBalanceTransaction; referenceId?: number },
    options: TxOptions = {},
  ) => this.applyBalanceChange(userId, amount, meta, options);
}

export default new paymentService();
