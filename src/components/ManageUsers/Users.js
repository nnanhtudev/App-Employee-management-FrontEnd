import { useEffect, useState } from "react";
import "./Users.scss";
import { fetchAllUsers } from "../../services/userService";
import ReactPaginate from "react-paginate";
const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  // const fetchUsers = async (page)
  const fetchUsers = async () => {
    // let response = await fetchAllUsers(page ? page : currentPage, currentLimit);
    let response = await fetchAllUsers(currentPage, currentLimit);
    if (response && response.data && +response.data.EC === 0) {
      console.log(response.data.DT);
      setTotalPages(response.data.DT && response.data.DT.totalPages)
      setListUsers(response.data.DT && response.data.DT.users)
    }
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1)
    // await fetchUsers(+event.selected + 1)
  };
  return (
    <div>
      <div className="manage-users-container container mt-4">
        <div className="user-header">
          <div className="title">
            <h1>Table Users</h1>
          </div>
          <div className="action">
            <button className="btn btn-success">
              <i className="fa fa-refresh" aria-hidden="true"></i>
            </button>
            <button className="btn btn-primary">
              <i className="fa fa-plus" aria-hidden="true"></i>Add New user
            </button>
          </div>
        </div>
        <div className="user-body mt-4">
          <table className="table table-bordered table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Group</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length > 0 ? (
                listUsers.map((item, index) => (
                  <tr key={`row-${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.Group ? item.Group.name : ''}</td>
                    <td>
                      <button className="btn btn-warning">
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </button>
                      <button className="btn btn-danger">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Not found Users</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 0 &&
          <div className="user-footer">
            <ReactPaginate
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< Previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        }
      </div>
    </div>
  );
};

export default Users;
