const { throwError } = require("./helpers");
const Parcel = require("./parcel.model");

// Submit Parcel
exports.sendParcel = async (req, res, next) => {
  try {
    // Generate a unique parcel number
    const parcelNumber = "PN" + Date.now();
    const parcelData = {
      ...req.body,
      parcelNumber,
    };

    const parcel = new Parcel(parcelData);
    await parcel.save();

    res.status(201).json({ message: "Parcel submitted successfully", parcel });
  } catch (err) {
    next(err);
  }
};

exports.getParcels = async (req, res, next) => {
  try {
    const parcels = await Parcel.find();
    if (!parcels) throwError("Parcels cannot be retreived", 404);

    res.status(200).json({ parcels });
  } catch (err) {
    next(err);
  }
};

exports.updateDeliveryStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    let query = {
      deliveryStatus: status,
    };

    if (status == "enroute") query.departureTime = Date.now();
    if (status == "arrived") query.arrivalTime = Date.now();
    if (status == "picked") query.pickupTime = Date.now();

    const parcel = await Parcel.findByIdAndUpdate(id, query, {
      new: true,
      upsert: true,
    });

    // notify sender and receiver
    if (!parcel) throwError("That parcel does not exist", 404);

    res.status(201).json({ message: "status updated", parcel });
  } catch (err) {
    next(err);
  }
};
