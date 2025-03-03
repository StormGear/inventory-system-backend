"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
const getDashboardMetrics = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularProducts = yield prisma.products.findMany({
            take: 5,
            orderBy: {
                stockQuantity: 'desc'
            }
        });
        const salesSummary = yield prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        });
        const purchaseSummary = yield prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        });
        const expenseSummary = yield prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        });
        const expenseByCategorySummaryRaw = yield prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        });
        const expenseByCategory = expenseByCategorySummaryRaw.map((item) => (Object.assign(Object.assign({}, item), { amount: item.amount.toString() })));
        res.status(200).json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategory
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting dashboard metrics" });
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
