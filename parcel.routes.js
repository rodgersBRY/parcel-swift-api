const app = require("express").Router();
const controller = require("./parcel.controller");

app.route("/").post(controller.sendParcel).get(controller.getParcels);
app.route("/:id").put(controller.updateDeliveryStatus);

module.exports = app;
