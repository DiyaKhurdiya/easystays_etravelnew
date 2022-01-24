const express = require("express");
const {
  newBooking, getSingleBooking, myBookings, deleteBooking, updateBooking
} = require("../controllers/bookingController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/booking/new").post(isAuthenticatedUser, newBooking);

router.route("/booking/:id").get(isAuthenticatedUser, getSingleBooking);

router.route("/bookings/me").get(isAuthenticatedUser, myBookings);

router
  .route("/admin/booking/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBooking)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBooking);
module.exports = router;