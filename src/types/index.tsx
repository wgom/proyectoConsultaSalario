export type Capcha = {
    ic?: string;
    id?: string;
};

export type data = {
    data: string[][];
};

export type SalaryInquiry = {
    result?: data;
    estado?: string;
};

export type SalaryInquiryParams = {
    inputValueAno?: string;
    inputValueMes?: string;
    inputValueCi?: string;
    inputValueIc?: string;
    inputValueCapcha?: string;
    capchaId?: string;
};

export type RootStakParams = {
    SalaryInquiry: undefined;
    SalaryDetail: SalaryInquiryParams;
};