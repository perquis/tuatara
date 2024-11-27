export interface Installment {
  total_installments: number;
  remaining_installments: number;
  financing_value: number;
  interest_rate: number;
}

export interface IInstallmentService {
  getReferenceRate(): Promise<number>;
  isIncreaseThanReferenceRate(reference_rate: number): boolean;
  save(): Promise<{ monthlyPayment: number; remainingLoanBalance: number }>;
}
