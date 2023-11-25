import { useEffect, useState } from "react";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import { getAllRole, fetchRoleByGroup } from "../../services/roleService";
import _ from "lodash";
import "./GroupRole.scss";

const GroupRole = (props) => {
  const [userGroup, setUserGroup] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");

  const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);

  useEffect(() => {
    getGroup();
    fetchAllRoles();
  }, []);

  const fetchAllRoles = async () => {
    let data = await getAllRole();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  const getGroup = async () => {
    const response = await fetchGroup();
    if (response && +response.EC === 0) {
      setUserGroup(response.DT);
    } else {
      toast.error(response.EM);
    }
  };

  const handleOnChangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      let data = await fetchRoleByGroup(value);
      if (data && +data.EC === 0) {
        // setListRoles(data.DT);
        let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
        setAssignRoleByGroup(result);
      }
    }
  };

  const buildDataRolesByGroup = (groupRole, allRoles) => {
    let result = [];
    if (allRoles && groupRole.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.id = role.id;
        object.url = role.url;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRole && groupRole.length > 0) {
          object.isAssigned = groupRole.some((item) => item.url === object.url);
        }
        result.push(object);
      });
    }
    return result;
  };
  const handleSelectRole = (value) => {
    let _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
    let foundIndex = _assignRoleByGroup.findIndex((item) => item.id === +value);
    console.log(foundIndex);
    if (foundIndex > -1) {
      _assignRoleByGroup[foundIndex].isAssigned = !_assignRoleByGroup[foundIndex].isAssigned;
    }
    setAssignRoleByGroup(_assignRoleByGroup);
  };
  return (
    <div className="group-role-container">
      <div className="container mt-4">
        <div className="title">
          <h4>Group Role</h4>
        </div>
        <div className="assign-group-role">
          <div className="col-12 col-sm-6 select mt-3">
            <label>
              Select Group
              <span>
                {" "}
                (<span className="red">*</span>):
              </span>
            </label>
            <select
              className="form-select form-control mt-2"
              onChange={(event) => handleOnChangeGroup(event.target.value)}
            >
              <option value="">Please select your group</option>
              {userGroup.length > 0 &&
                userGroup.map((item, index) => {
                  return (
                    <option key={`group-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <hr />
          {selectGroup && (
            <div className="roles">
              <h5>Assign Role</h5>
              {assignRoleByGroup &&
                assignRoleByGroup.length > 0 &&
                assignRoleByGroup.map((item, index) => {
                  return (
                    <div className="form-check" key={`list-role-${index}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item.id}
                        checked={item.isAssigned}
                        onChange={(event) => handleSelectRole(event.target.value)}
                        id={`list-role-${index}`}
                      />
                      <label className="form-check-label" htmlFor={`list-role-${index}`}>
                        {item.url}
                      </label>
                    </div>
                  );
                })}
            </div>
          )}
          <div className="mt-3">
            <button className="btn btn-warning">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupRole;
