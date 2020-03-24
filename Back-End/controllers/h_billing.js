const H_billing = require("../models/h_billing");

const createBill = async (req,res)=>{
    const bill = await new H_billing(req.body)
    await bill.save()
    res.status(200).json({message:"Generated bill successfuly"})
};

const getBill = (req,res)=>{
    const patient_id = req.profile._id
    const bill = H_billing.find({
        patient_id: patient_id,
        paid: false
    },(err,bill)=>{
        if(err){
            res.status(400).json({error:err})
        }
        else{
            res.status(200).json(bill)
        }
    })
}

const payBill = (req,res)=>{
    let bill = req.profile
    bill.paid = true
    bill.updated = Date.now()
    bill.save((err)=>{
        if(err) return res.status(400).json({error:err})
        else res.json({message:"Bill has been paid"})
    })
}

const BillById = (req,res,next,id)=>{
    H_billing.findById(id).exec((err,bill)=>{
        if(err||!bill){
            return res.status(400).json({Message:"No bill found"});
        }
        req.profile = bill;
        next();
    });
};

module.exports = {createBill,getBill,payBill,BillById} 