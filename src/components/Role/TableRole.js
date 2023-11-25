import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { deleteRole, getAllRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);

  useEffect(() => {
    fetchAllRoles();
  }, []);
  useImperativeHandle(ref, () => ({
    fetchListRolesAgain() {
      fetchAllRoles();
    },
  }));
  const fetchAllRoles = async () => {
    let data = await getAllRole();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  const handleDeleteRole = async (role) => {
    let data = await deleteRole(role);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      await fetchAllRoles();
    }
  };

  return (
    <>
      <table className="table table-bordered table-hover table-sm mt-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">URL</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            listRoles.map((item, index) => (
              <tr key={`row-${index}`}>
                <td>{item.id}</td>
                <td>{item.url}</td>
                <td>{item.description}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeleteRole(item)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Not found Roles</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
});

export default TableRole;
