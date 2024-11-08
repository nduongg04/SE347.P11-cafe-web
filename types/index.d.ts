declare type VoucherType = "Percentage of bill" | "Discount directly on invoice";

declare type Voucher = {
  id: number;
  code: string;
  value: number;
  typeName: VoucherType;
  numberOfApplications: number;
  createdAt: Date;
  expiredAt: Date;
}

declare type VoucherApi = {
  voucherID: number;
  voucherCode: string;
  voucherValue: number;
  voucherType: {
    voucherTypeID: number;
    typeName: VoucherType;
  };
  maxApply: number;
  createdDate: string;
  expiredDate: string;
};



