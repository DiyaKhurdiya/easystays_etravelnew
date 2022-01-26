const express = require("express");
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomDetails,
  createReview,
  deleteReview,
  getReviews,
} = require("../controllers/roomController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/rooms").get(getAllRooms);
router
  .route("/admin/room/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createRoom);
router
  .route("/admin/room/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateRoom)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRoom);

router.route("/room/:id").get(getRoomDetails);
router.route("/review").put(isAuthenticatedUser, createReview);
router
  .route("/reviews")
  .get(getReviews)
  .delete(isAuthenticatedUser, deleteReview);
module.exports = router;
