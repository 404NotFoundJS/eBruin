import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { listUserReviews } from '../actions/reviewActions';

export default function ReviewTable() {
  const dispatch = useDispatch();
  const { loading, error, reviews } = useSelector((state) => state.reviewList);
  const { userInfo } = useSelector((state) => state.userSignin);

  useEffect(() => {
    dispatch(listUserReviews(userInfo._id));
  }, [dispatch, userInfo._id]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Loading...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {error}
              </TableCell>
            </TableRow>
          ) : reviews.length === 0 ? (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                No Reviews
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review) => (
              <TableRow
                key={review._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {review.createdAt.substring(0, 10)}
                </TableCell>
                <TableCell align="right">
                  <Rating name="read-only" value={review.rating} readOnly />
                </TableCell>
                <TableCell align="right">{review.comment}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
