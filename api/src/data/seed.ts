export interface Order {
  id: number;
  userId: number;
  product: string;
  total: number;
  status: "pending" | "shipped" | "delivered";
  createdAt: string;
}

// Sequential IDs — intentional BOLA surface
export const orders: Order[] = [
  { id: 1, userId: 101, product: "Laptop Pro", total: 4999.99, status: "delivered", createdAt: "2024-01-10" },
  { id: 2, userId: 102, product: "Teclado Mecânico", total: 349.90, status: "shipped", createdAt: "2024-01-12" },
  { id: 3, userId: 101, product: "Monitor 4K", total: 2199.00, status: "pending", createdAt: "2024-01-15" },
  { id: 4, userId: 103, product: "Headset Gamer", total: 599.00, status: "delivered", createdAt: "2024-01-16" },
  { id: 5, userId: 102, product: "SSD NVMe 2TB", total: 899.00, status: "pending", createdAt: "2024-01-18" },
  { id: 6, userId: 104, product: "Webcam HD", total: 279.90, status: "shipped", createdAt: "2024-01-20" },
  { id: 7, userId: 101, product: "Cadeira Ergonômica", total: 3200.00, status: "delivered", createdAt: "2024-01-22" },
  { id: 8, userId: 105, product: "Hub USB-C", total: 149.90, status: "pending", createdAt: "2024-01-25" },
];
