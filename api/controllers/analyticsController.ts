import { Request, Response } from 'express';
import { getSupabase, hasDatabase } from '../config/supabase';

const mockSalesData = [
  { id: '1', date: '2024-01-15', revenue: 12500, orders: 85, platform: 'taobao' },
  { id: '2', date: '2024-01-16', revenue: 14200, orders: 98, platform: 'tmall' },
  { id: '3', date: '2024-01-17', revenue: 15800, orders: 105, platform: 'jd' },
  { id: '4', date: '2024-01-18', revenue: 17500, orders: 120, platform: 'douyin' },
  { id: '5', date: '2024-01-19', revenue: 19200, orders: 135, platform: 'xiaohongshu' },
  { id: '6', date: '2024-01-20', revenue: 21500, orders: 150, platform: 'taobao' },
  { id: '7', date: '2024-01-21', revenue: 24800, orders: 175, platform: 'tmall' },
];

export const getSalesData = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  
  try {
    if (hasDatabase()) {
      const supabase = getSupabase();
      let query = supabase!.from('sales_data').select('*');
      
      if (startDate) {
        query = query.gte('sale_date', startDate);
      }
      if (endDate) {
        query = query.lte('sale_date', endDate);
      }
      
      const { data: salesData, error } = await query.order('sale_date', { ascending: true });
      
      if (error) {
        return res.status(500).json({ message: '获取销售数据失败' });
      }
      
      res.json(salesData);
    } else {
      let filteredData = mockSalesData;
      
      if (startDate) {
        filteredData = filteredData.filter((item) => item.date >= (startDate as string));
      }
      if (endDate) {
        filteredData = filteredData.filter((item) => item.date <= (endDate as string));
      }
      
      res.json(filteredData);
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const getTrafficData = async (req: Request, res: Response) => {
  try {
    const mockData = [
      { date: '2024-01-15', visitors: 3200, pageviews: 8500 },
      { date: '2024-01-16', visitors: 3500, pageviews: 9200 },
      { date: '2024-01-17', visitors: 3800, pageviews: 10100 },
      { date: '2024-01-18', visitors: 4200, pageviews: 11500 },
      { date: '2024-01-19', visitors: 4500, pageviews: 12800 },
      { date: '2024-01-20', visitors: 5200, pageviews: 14500 },
      { date: '2024-01-21', visitors: 5800, pageviews: 16200 },
    ];
    
    res.json(mockData);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const getConversionData = async (req: Request, res: Response) => {
  try {
    const mockData = [
      { date: '2024-01-15', conversionRate: 3.2, addToCartRate: 8.5, favoriteRate: 5.2, transactionRate: 2.8 },
      { date: '2024-01-16', conversionRate: 3.5, addToCartRate: 9.1, favoriteRate: 5.8, transactionRate: 3.1 },
      { date: '2024-01-17', conversionRate: 3.8, addToCartRate: 9.5, favoriteRate: 6.2, transactionRate: 3.3 },
      { date: '2024-01-18', conversionRate: 4.1, addToCartRate: 10.2, favoriteRate: 6.8, transactionRate: 3.6 },
      { date: '2024-01-19', conversionRate: 4.3, addToCartRate: 10.8, favoriteRate: 7.1, transactionRate: 3.8 },
      { date: '2024-01-20', conversionRate: 4.5, addToCartRate: 11.5, favoriteRate: 7.5, transactionRate: 4.0 },
      { date: '2024-01-21', conversionRate: 4.8, addToCartRate: 12.2, favoriteRate: 8.0, transactionRate: 4.2 },
    ];
    
    res.json(mockData);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const getReport = async (req: Request, res: Response) => {
  try {
    if (hasDatabase()) {
      const supabase = getSupabase();
      
      const { data: products } = await supabase!.from('products').select('id');
      const { data: salesData } = await supabase!.from('sales_data').select('revenue');
      
      const totalSales = salesData?.reduce((sum: number, item: { revenue: number }) => sum + item.revenue, 0) || 0;
      const totalOrders = salesData?.length || 0;
      
      res.json({
        totalSales,
        totalOrders,
        productCount: products?.length || 0,
        avgOrderValue: totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : '0',
      });
    } else {
      const totalSales = mockSalesData.reduce((sum: number, item: { revenue: number }) => sum + item.revenue, 0);
      const totalOrders = mockSalesData.reduce((sum: number, item: { orders: number }) => sum + item.orders, 0);
      
      res.json({
        totalSales,
        totalOrders,
        productCount: 24,
        avgOrderValue: totalOrders > 0 ? ((totalSales / totalOrders) * 100).toFixed(2) : '0',
      });
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};