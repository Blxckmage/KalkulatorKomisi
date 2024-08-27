"use server";
import prisma from "@/lib/db";
import { Employee } from "@/types/employee.types";

export const createEmployee = async (values: Employee) => {
	const employee = await prisma.employee.create({
		data: values,
	});

	return employee;
};

export const getAllEmployees = async () => {
	const employees = await prisma.employee.findMany();

	return employees;
};
