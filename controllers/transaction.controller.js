import Transaction from "../models/transaction.model.js";
import Service from "../models/service.model.js";

export async function initiateTransaction(req, res) {
  const { amount, service } = req.body;
  const user = req.user._id;
  if (!amount || !service) {
    return res
      .status(400)
      .json({ status: "error", message: "required fields: amount, service" });
  }

  try {
    const serviceCheck = await Service.findById(service);
    if (!serviceCheck) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Service ID" });
    }
    const transaction = await Transaction.create({
      user,
      amount,
      service,
    });
    if (!transaction)
      return res.status(500).json({ status: "error", message: err.message });
    return res.status(201).json({
      status: "success",
      message: "transaction initiated",
      transaction,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ staus: "error", message: err.message });
  }
}

export async function getAllTransactions(req, res) {
  const { status } = req.query;
  const q = {};
  const validStatus = ["INITIATED", "SUCCESS", "FAILED"];
  if (status) {
    if (!validStatus.includes(status))
      return res
        .status(400)
        .json({ status: "error", message: "invalid status" });
    q.status = status;
  }
  try {
    const transactions = await Transaction.find(q).populate("user service");
    res.status(200).json({ status: "success", transactions });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
export async function getTransactionById(req, res) {
  const { transactionId } = req.params;
  if (!transactionId) {
    return res
      .status(400)
      .json({ status: "error", message: "required fields: transactionId" });
  }
  try {
    const transaction = await Transaction.findById(transactionId).populate(
      "user service"
    );
    if (!transaction)
      return res
        .status(404)
        .json({ status: "error", message: "transaction not found" });

    res.status(200).json({ status: "success", transaction });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
export async function deleteTransaction(req, res) {
  const { transactionId } = req.params;
  if (!transactionId) {
    return res
      .status(400)
      .json({ status: "error", message: "required fields: transactionId" });
  }
  try {
    const transaction = await Transaction.findByIdAndDelete(
      transactionId
    ).populate("user service");
    if (!transaction)
      return res
        .status(404)
        .json({ status: "error", message: "transaction not found" });

    res
      .status(200)
      .json({ status: "success", message: "Transaction Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function updateTransactionDetails(req, res) {
  const { details, status, transactionId } = req.body;
  if (!transactionId || !status || !details) {
    return res.status(400).json({
      status: "error",
      message: "required fields: transactionId, status, transactionDetails",
    });
  }
  if (!["SUCCESS", "FAILED"].includes(status)) {
    return res.status(400).json({ status: "error", message: "invalid status" });
  }

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        details,
        status,
      },
      { new: true }
    ).populate("user service");
    if (!transaction) {
      return res
        .status(404)
        .json({ status: "error", message: "transaction not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Transaction Update Successfully",
      transaction,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
