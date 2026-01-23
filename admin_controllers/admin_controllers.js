// const db = require('../db')
import {db} from '../db.js'

export const dashboardstats = async (req, res) => {
    try {
        const collections = await db();
        // Get Collections
        const usersCol = collections.user;            // Correct
        const leadsCol = collections.leads;
        const quotationsCol = collections.quotation;
        const exportsCol = collections.exports;

        // ===== TOTAL COUNTS =====
        const totalUsers = await usersCol.countDocuments();
        const totalLeads = await leadsCol.countDocuments();
        const totalQuotes = await quotationsCol.countDocuments();

        // If exports = leads (as in SQL), use leadsCol again:
        const totalExports = await leadsCol.countDocuments();


        // ===== LEADS BY COUNTRY (GROUP BY country) =====
        const leadsByCountry = await leadsCol
            .aggregate([
                {
                    $group: {
                        _id: "$country",      // group by country
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        country: "$_id",
                        count: 1,
                        _id: 0
                    }
                }
            ])
            .toArray();


        // ===== FOLLOWUPS: next 7 days =====
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
console.log("nextWeek",nextWeek)
        const followups = await leadsCol
            .find(
                {
                    mongoDate: {
                        $lte: nextWeek
                    }
                },
                {
                    projection: {
                        clientName: "$name",
                        name: 1,
                        country: 1,
                        mongoDate: 1,
                        status: 1
                    }
                }
            )
            .sort({ mongoDate: 1 })
            .toArray();


        // ===== RESPONSE =====
        res.status(200).json({
            success: true,
            stats: {
                users: totalUsers,
                leads: totalLeads,
                quotations: totalQuotes,
                exports: totalExports,
            },
            charts: {
                leadsByCountry,
            },
            followups,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong in dashboard stats",
        });
    }
}

// module.exports = { dashboardstats }