interface SushiItem {
    name: string;
    price: string;
    description?: string; // Optional property
}

interface SushiCategory {
    category: string;
    items: SushiItem[];
}