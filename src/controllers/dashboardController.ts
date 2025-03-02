import  { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 *
 * /dashboard:
 *   get:
 *     description: Get dashboard metrics
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error getting dashboard metrics
 */
export const getDashboardMetrics = async (_: Request, res: Response): Promise<void> => {
    try {
        const popularProducts = await prisma.products.findMany({
            take: 5,
            orderBy: {
                stockQuantity: 'desc'
            }
        });
        const salesSummary = await prisma.sales.findMany({
            take: 5,
            orderBy: {
                quantity: 'desc'
            }
        })
        const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        })
        const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        })
        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        })
        const expenseByCategory = expenseByCategorySummaryRaw.map((item) => ({
            ...item,
            amount: item.amount.toString()
        }))
        res.status(200).json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategory
        });

        

    } catch (error) {
        res.status(500).json({ message: "Error getting dashboard metrics" });
    }
}