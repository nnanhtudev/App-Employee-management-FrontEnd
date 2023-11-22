import { useEffect, useState } from "react";
import "./Users.scss";
import { fetchAllUsers, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  //ModalDelete
  const [dataModal, setDataModal] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  // Modal CREATE/UPDATE Users
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const [dataModalUser, setDataModalUser] = useState({});
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  // const fetchUsers = async (page)
  const fetchUsers = async () => {
    // let response = await fetchAllUsers(page ? page : currentPage, currentLimit);
    let response = await fetchAllUsers(currentPage, currentLimit);
    if (response && +response.EC === 0) {
      setTotalPages(response.DT && response.DT.totalPages);
      setListUsers(response.DT && response.DT.users);
    }
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
    // await fetchUsers(+event.selected + 1)
  };

  const handleDelete = async (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModal);
    if (response && +response.EC === 0) {
      toast.success(`${response.EM} have: ${dataModal.email}`);
      await fetchUsers();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.EM);
    }
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUser({});
    await fetchUsers();
  };

  const handleEditUsers = (user) => {
    setActionModalUser("UPDATE");
    setDataModalUser(user);
    setIsShowModalUser(true);
  };
  const handleRefresh = async () => {
    await fetchUsers();
  };
  return (
    <>
      <div>
        <div className="manage-users-container container mt-4">
          <div className="user-header">
            <div className="title">
              <h3>Manage user</h3>
            </div>
            <div className="action">
              <button className="btn btn-success mx-2" onClick={() => handleRefresh()}>
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>Add New user
              </button>
            </div>
          </div>
          <div className="user-body mt-4 ">
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
                      <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td>{item.Group ? item.Group.name : ""}</td>
                      <td>
                        <button className="btn btn-warning mx-2 " onClick={() => handleEditUsers(item)}>
                          <i className="fa fa-edit" aria-hidden="true"></i>
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(item)}>
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
          {totalPages > 0 && (
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
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />
      <ModalUser
        show={isShowModalUser}
        onHide={onHideModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  );
};

export default Users;
