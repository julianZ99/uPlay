export class Coin {

    symbol: string;
    market_cap_rank: number;
    name: string;
    image: string;
    current_price: number;
    total_volume: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    id: string;

    constructor(data: any) {
        this.current_price = data.current_price;
        this.image = data.image;
        this.market_cap_rank = data.market_cap_rank;
        this.name = data.name;
        this.price_change_24h = data.price_change_24h;
        this.price_change_percentage_24h = data.price_change_percentage_24h;
        this.symbol = data.symbol;
        this.total_volume = data.total_volume;
        this.id = data.id;
    }
}
