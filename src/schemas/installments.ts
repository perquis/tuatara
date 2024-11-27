import { Installment } from "@/interfaces/installments";
import z from "zod";

type InstallmentKeys = keyof Installment;

type InstallmentSchema = {
  [key in InstallmentKeys]: z.ZodType<Installment[key], any, Installment[key]>;
};

export const installmentSchema = z.object<InstallmentSchema>({
  total_installments: z.number().int().positive(),
  interest_rate: z.number().multipleOf(0.01).positive(),
  financing_value: z.number().positive(),
  remaining_installments: z.number().int().nonnegative(),
});
