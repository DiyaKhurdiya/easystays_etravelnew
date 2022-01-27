import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myBookings.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myBookings } from "../../actions/bookingAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyBookings = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, bookings } = useSelector((state) => state.myBookings);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Booking ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemName",
      headerName: "Room",
      type: "string",
      minWidth: 160,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/booking/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  bookings &&
    bookings.forEach((item, index) => {
      rows.push({
        itemName: item.roomName,
        id: item._id,
        status: item.bookingStatus,
        amount: item.totalAmount,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myBookings());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Bookings`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myBookingsPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myBookingsTable"
            autoHeight
          />

          <Typography id="myBookingsHeading">{user.name}'s Bookings</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyBookings;
