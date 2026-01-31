import { db } from '../db.js'
import { ObjectId } from "mongodb";
const collections = await db();

function formatDateOnly(dateValue) {
    console.log("dateValue", dateValue)
    const date = new Date(dateValue);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
export const Addquotation = async (req, res) => {
    const { quotation_no, lead_id, currency, status, followup_date, items } = req.body
    try {
        const total_amount = items.reduce(
            (sum, item) => sum + item.qty * item.price,
            0
        );
        const numbercheck = await collections.quotation.findOne({ quotation_no })
        if (numbercheck) {
         return   res.status(400).json({
                message: "Number is already added please add another number "
            })
        }
        const quotation = {
            quotation_no,
            lead_id: new ObjectId(lead_id),
            currency,
            status: status || "Sent",
            followup_date: followup_date ? new Date(followup_date) : null,
            items: items.map(item => ({
                product_id: new ObjectId(item.product_id),
                qty: item.qty,
                price: item.price
            })),
            total_amount,
            created_at: new Date()
        };

        const result = await collections.quotation.insertOne(quotation);

        res.status(201).json({
            success: true,
            quotation_id: result.insertedId
        });
    } catch (error) {
        console.log("error", error)
    }
}

export const GetAllQuotation = async (req, res) => {
    try {

        const data = await collections.quotation.aggregate([
            {
                $lookup: {
                    from: "leads",            // leads collection name
                    localField: "lead_id",    // field in quotation
                    foreignField: "_id",      // field in leads
                    as: "leadDetails"
                }
            },
            {
                $unwind: {
                    path: "$leadDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    quotation_no: 1,
                    lead_id: 1,
                    currency: 1,
                    status: 1,
                    items: 1,
                    followup_date: 1,
                    lead_name: "$leadDetails.name", // 👈 lead name
                }
            }
        ]).toArray();

        const alldata = data.map((u, i) => ({
            id: i + 1,
            _id: u._id?.toString(),
            ...u,
            followup_date: formatDateOnly(u.followup_date),
        }));
        res.status(200).json({
            message: "Get Quotation Scussfully!!!",
            status: true,
            alldata
        })


    } catch (error) {
        console.log("Error", error)
    }
}