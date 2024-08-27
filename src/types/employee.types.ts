import { z } from "zod";

export const EmployeeSchema = z.object({
	id: z.number(),
	name: z.string(),
});

export type Employee = z.infer<typeof EmployeeSchema>;
