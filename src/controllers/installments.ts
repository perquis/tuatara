import { Installment } from "@/interfaces/installments";
import { HttpExceptionError } from "@/libs/errors/http-exception-error";
import middlewares from "@/middlewares";
import { installmentSchema } from "@/schemas/installments";
import { InstallmentService } from "@/services/installments";
import { MailerService } from "@/services/mailer";
import { Request, Router } from "express";
import "express-async-errors";

const installmentRouter = Router();

type RequestWithBody = Request<{}, {}, Installment>;

installmentRouter.post(
  "/",
  middlewares.isAuthenticated,
  middlewares.zodValidations(installmentSchema),
  async (req: RequestWithBody, res) => {
    if (req.body.remaining_installments > req.body.total_installments)
      throw new HttpExceptionError("Remaining installments cannot be greater than total installments", 400);

    const installment = new InstallmentService(req.body);
    const mailer = new MailerService();

    const referenceRate = await installment.getReferenceRate();

    if (installment.isIncreaseThanReferenceRate(referenceRate))
      throw new HttpExceptionError("Installment rate is greater than reference rate", 400);

    const data = await installment.save();

    if (data.remainingLoanBalance <= 0) mailer.sendMailWhenInstallmentPaid();

    res.json({
      success: true,
      data,
    });
  }
);

export { installmentRouter as installments };
