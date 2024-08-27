import z from "zod";
import { EmployeeSchema } from "./employee.types";

export const JobSchema = z.object({
	id: z.number().optional(),
	period_job: z.date(),
	amount: z.coerce.number().min(0),
	gross_profit: z.coerce.number().min(0),
	commission: z.coerce.number().min(0),
	employee: EmployeeSchema,
	employeeId: z.number().optional(),
});

export type Job = z.infer<typeof JobSchema>;
