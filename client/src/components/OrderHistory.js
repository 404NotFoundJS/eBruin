import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  // const orderCompleteHandler = (order) => {
  //   navigate(`/user/${order.seller._id}/reviewUser`);
  // };
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return orders && orders.length === 0 ? (
    <div>No history orders</div>
  ) : loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>seller</th>
            <th>Created At</th>
            <th>Traded</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderItem.product.name}</td>
              <td>${order.totalPrice}</td>
              <td>{order.seller.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>
                {order.orderComplete ? (
                  <div>Completed</div>
                ) : (
                  <Button
                    variant="success"
                    // onClick={orderCompleteHandler(order)}
                  >
                    Confirm
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination>
          <Pagination.First
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(1)}
          />
          <Pagination.Prev
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          />
          <Pagination.Item disabled>{pageNumber}</Pagination.Item>
          <Pagination.Next
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          />
          <Pagination.Last
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber(totalPages)}
          />
        </Pagination>
      )}
    </div>
  );
}
