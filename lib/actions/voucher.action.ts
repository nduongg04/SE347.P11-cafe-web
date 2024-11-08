"use server";

import { authenticatedFetch } from "../auth";



function turnVoucherType (voucher: Voucher) : VoucherApi {
	const voucherApi: VoucherApi = {
		voucherID: voucher.id,
		voucherCode: voucher.code,
		voucherValue: voucher.value,
		voucherType: {
			voucherTypeID: voucher.typeName === "Percentage of bill" ? 1 : 2,
			typeName: voucher.typeName,
		},
		maxApply: voucher.numberOfApplications,
		createdDate: voucher.createdAt.toISOString(),
		expiredDate: voucher.expiredAt.toISOString(),
	}
	return voucherApi;
}

export async function getAllVouchers(): Promise<VoucherApi[] | null> {
  try {
    const data = await authenticatedFetch(
      `${process.env.BASE_URL}/voucher/getall`,
      { method: "GET" },
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createVoucher(
  voucher: Voucher,
): Promise<VoucherApi | null> {
  try {
    const data = await authenticatedFetch(
      `${process.env.BASE_URL}/voucher/create`,
      { method: "POST", body: JSON.stringify(turnVoucherType(voucher)) },
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateVoucher(voucher: Voucher): Promise<VoucherApi | null> {
  try {
    const data = await authenticatedFetch(
      `${process.env.BASE_URL}/voucher/update/${voucher.id}`,
      { method: "POST", body: JSON.stringify(turnVoucherType(voucher)) },
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
