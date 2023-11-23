export interface Transaction {
    id: number;
    userId: number;
    transactionDate: number[];
    amount: number;
    currentDollarBlueValue: number;
    cryptocurrency: string;
    cryptoAmount: number;
    currentCryptoValue: number;
    Date: Date;
}

