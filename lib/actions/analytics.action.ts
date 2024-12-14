"use server";

import { authenticatedFetch } from "../auth";

const BASE_URL = process.env.BASE_URL;

export async function getRevenue(start: string, end: string) {
	
  const res = await authenticatedFetch(
    `${BASE_URL}/report/getrevenue?start=${start}&end=${end}`,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch revenue data");
  }
  return data;
}

export async function getRevenueByDate(date: string) {
  const res = await authenticatedFetch(`${BASE_URL}/report/getrevenuebydate/${date}`);
  if (!res.ok) {
    throw new Error("Failed to fetch revenue by date");
  }
  return res.json();
}

export async function getProductReport(start: string, end: string) {
  const res = await authenticatedFetch(
    `${BASE_URL}/report/getproductreport?start=${start}&end=${end}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch product report");
  }
  return res.json();
}

export async function getReportBill(start: string, end: string) {
  const res = await authenticatedFetch(
    `${BASE_URL}/report/getreportbill?start=${start}&end=${end}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch bill report");
  }
  return res.json();
}
