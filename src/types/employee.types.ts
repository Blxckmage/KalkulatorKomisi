import { z } from "zod";

export const EmployeeSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(2).max(255),
});

export type Employee = z.infer<typeof EmployeeSchema>;
