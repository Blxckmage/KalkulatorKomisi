"use server";
import prisma from "@/lib/db";
import { Job } from "@/types/job.types";

export const createJob = async (values: Job) => {
	const newJob = await prisma.job.create({
		data: {
			employee: {
				connect: {
					id: values.employeeId,
				},
			},
			period_job: values.period_job,
			amount: values.amount,
			gross_profit: values.gross_profit,
			commission: values.commission,
		},
	});

	return newJob;
};

export const getAllJobs = async () => {
	const jobs = await prisma.job.findMany({
		include: {
			employee: true,
		},
	});

	return jobs;
};
