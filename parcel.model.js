const { Schema, model } = require("mongoose");

const parcelSchema = new Schema({
  senderName: { type: String, required: true },
  senderId: { type: Number, required: true },
  senderPhone: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverPhone: { type: String, required: true },
  receiverId: { type: Number, required: false },
  value: { type: Number, required: true },
  description: { type: String, required: true },
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: false },
  arrivalTime: { type: String, required: false },
  pickupTime: { type: String, required: false },
  deliveryStatus: {
    type: String,
    enum: ["pending", "enroute", "arrived", "picked"],
    default: "pending",
    required: true,
  },
  parcelNumber: { type: String, required: true, unique: true },
  specialInstructions: { type: String, required: false },
});

module.exports = model("Parcel", parcelSchema);
