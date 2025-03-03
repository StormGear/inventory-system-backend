import  { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Book:
//  *       type: object
//  *       required:
//  *         - title
//  *         - author
//  *         - finished
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The auto-generated id of the book
//  *         title:
//  *           type: string
//  *           description: The title of your book
//  *         author:
//  *           type: string
//  *           description: The book author
//  *         finished:
//  *           type: boolean
//  *           description: Whether you have finished reading the book
//  *         createdAt:
//  *           type: string
//  *           format: date
//  *           description: The date the book was added
//  *       example:
//  *         id: d5fE_asz
//  *         title: The New Turing Omnibus
//  *         author: Alexander K. Dewdney
//  *         finished: false
//  *         createdAt: 2020-03-10T04:05:06.157Z
//  */

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Routes for managing the dashboard
 */

/**
 * @swagger
 *
 * /dashboard:
 *   get:
 *     tags: [Dashboard]
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
        const salesSummary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
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