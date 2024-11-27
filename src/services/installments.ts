import { IInstallmentService, Installment } from "@/interfaces/installments";
import { prisma } from "@/libs/db/prisma";
import { HttpExceptionError } from "@/libs/errors/http-exception-error";
import { DOMParser } from "xmldom";

export class InstallmentService implements IInstallmentService {
  private totalInstallments: number;
  private remainingInstallments: number;
  private financingValue: number;
  private interestRate: number;

  constructor({ financing_value, interest_rate, remaining_installments, total_installments }: Installment) {
    this.financingValue = financing_value;
    this.interestRate = interest_rate;
    this.remainingInstallments = remaining_installments;
    this.totalInstallments = total_installments;
  }

  public async getReferenceRate() {
    try {
      const nbpUrl = "https://static.nbp.pl/dane/stopy/stopy_procentowe.xml";
      const data = await fetch(nbpUrl);
      const xml = await data.text();
      const doc = new DOMParser().parseFromString(xml, "text/xml");

      const ref = doc.getElementById("ref"),
        interestRateRef = ref!.getAttribute("oprocentowanie");

      const interestRate = parseFloat(interestRateRef!.replace(",", "."));

      const existingReferenceRate = await this.isExistingReferenceRate(interestRate);
      return existingReferenceRate ?? interestRate;
    } catch (error) {
      throw new HttpExceptionError("Error while fetching reference rate", 500);
    }
  }

  public async isExistingReferenceRate(referenceRate: number) {
    try {
      const findReferenceRate = await prisma.referenceRate.findFirst({ where: { referenceRate } });
      if (findReferenceRate) return findReferenceRate.referenceRate;

      await prisma.referenceRate.create({ data: { referenceRate } });
      return null;
    } catch (error) {
      throw new HttpExceptionError("Error while fetching data from db", 500);
    }
  }

  public isIncreaseThanReferenceRate(reference_rate: number) {
    return this.interestRate > reference_rate;
  }

  public async save() {
    try {
      const data = this.computeInstallmentSummary();
      await prisma.installment.create({ data });

      return data;
    } catch (error) {
      console.log(error);
      throw new HttpExceptionError("Error while saving installment", 500);
    }
  }

  private computeInstallmentSummary() {
    return {
      monthlyPayment: this.getMonthlyPayment(),
      remainingLoanBalance: this.getRemainingLoanBalance(),
    };
  }

  private getMonthlyPayment() {
    const monthlyInterestRate = this.interestRate / 100 / 12;
    const monthlyPayment =
      (this.financingValue * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, this.totalInstallments)) /
      (Math.pow(1 + monthlyInterestRate, this.totalInstallments) - 1);

    return monthlyPayment;
  }

  private getRemainingLoanBalance() {
    const monthlyInterestRate = this.interestRate / 100 / 12;
    const k = this.totalInstallments - this.remainingInstallments;
    const K = this.financingValue;
    const R = this.getMonthlyPayment();

    const remainingLoanBalance =
      Math.pow(1 + monthlyInterestRate, k) * K - (R * (Math.pow(1 + monthlyInterestRate, k) - 1)) / monthlyInterestRate;

    return remainingLoanBalance;
  }
}
