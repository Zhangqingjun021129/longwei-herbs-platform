import { Request, Response } from 'express';

interface SalesData {
  date: string;
  sales: number;
  orders: number;
  revenue: number;
}

interface TrafficData {
  date: string;
  visits: number;
  page_views: number;
  bounce_rate: number;
}

interface ConversionData {
  date: string;
  conversion_rate: number;
  avg_order_value: number;
  customer_count: number;
}

const salesData: SalesData[] = [
  { date: '2024-01-15', sales: 1200, orders: 85, revenue: 156000 },
  { date: '2024-01-16', sales: 1350, orders: 92, revenue: 175500 },
  { date: '2024-01-17', sales: 1100, orders: 78, revenue: 143000 },
  { date: '2024-01-18', sales: 1450, orders: 101, revenue: 188500 },
  { date: '2024-01-19', sales: 1600, orders: 115, revenue: 208000 },
  { date: '2024-01-20', sales: 1800, orders: 128, revenue: 234000 },
  { date: '2024-01-21', sales: 1550, orders: 108, revenue: 201500 },
];

const trafficData: TrafficData[] = [
  { date: '2024-01-15', visits: 5000, page_views: 12500, bounce_rate: 45 },
  { date: '2024-01-16', visits: 5500, page_views: 13750, bounce_rate: 43 },
  { date: '2024-01-17', visits: 4800, page_views: 12000, bounce_rate: 47 },
  { date: '2024-01-18', visits: 6000, page_views: 15000, bounce_rate: 42 },
  { date: '2024-01-19', visits: 6500, page_views: 16250, bounce_rate: 40 },
  { date: '2024-01-20', visits: 7000, page_views: 17500, bounce_rate: 38 },
  { date: '2024-01-21', visits: 5800, page_views: 14500, bounce_rate: 44 },
];

const conversionData: ConversionData[] = [
  { date: '2024-01-15', conversion_rate: 2.4, avg_order_value: 1835, customer_count: 85 },
  { date: '2024-01-16', conversion_rate: 2.45, avg_order_value: 1907, customer_count: 92 },
  { date: '2024-01-17', conversion_rate: 2.29, avg_order_value: 1833, customer_count: 78 },
  { date: '2024-01-18', conversion_rate: 2.42, avg_order_value: 1866, customer_count: 101 },
  { date: '2024-01-19', conversion_rate: 2.54, avg_order_value: 1809, customer_count: 115 },
  { date: '2024-01-20', conversion_rate: 2.57, avg_order_value: 1828, customer_count: 128 },
  { date: '2024-01-21', conversion_rate: 2.67, avg_order_value: 1866, customer_count: 108 },
];

export const getSalesData = async (req: Request, res: Response) => {
  res.json(salesData);
};

export const getTrafficData = async (req: Request, res: Response) => {
  res.json(trafficData);
};

export const getConversionData = async (req: Request, res: Response) => {
  res.json(conversionData);
};

export const getDashboardData = async (req: Request, res: Response) => {
  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0);
  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const avgConversionRate = conversionData.reduce((sum, d) => sum + d.conversion_rate, 0) / conversionData.length;
  
  res.json({
    totalSales,
    totalOrders,
    totalRevenue,
    avgConversionRate,
    salesData,
    trafficData,
    conversionData,
  });
};

export const getReport = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  
  res.json({
    startDate,
    endDate,
    salesData,
    trafficData,
    conversionData,
    summary: {
      totalSales: salesData.reduce((sum, d) => sum + d.sales, 0),
      totalOrders: salesData.reduce((sum, d) => sum + d.orders, 0),
      totalRevenue: salesData.reduce((sum, d) => sum + d.revenue, 0),
    },
  });
};