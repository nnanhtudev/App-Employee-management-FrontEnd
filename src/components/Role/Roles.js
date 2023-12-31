import { useRef, useState } from "react";
import "./Role.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRole from "../Role/TableRole";

const Role = (props) => {
  const defaultChild = { url: "", description: "", isValidUrl: true };
  const childRef = useRef();
  const [listChild, setListChild] = useState({
    child1: defaultChild,
  });

  const handleOnchangeInput = (name, value, key) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;
    if (value && name === "url") {
      _listChild[key]["isValidUrl"] = true;
    }
    setListChild(_listChild);
  };

  const handleAddNewChild = () => {
    console.log("add new child");
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = defaultChild;
    setListChild(_listChild);
  };

  const handleAddDeleteChild = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
  };

  const buildDataToPersist = () => {
    let _listChild = _.cloneDeep(listChild);
    let results = [];
    Object.entries(_listChild).map(([key, child], index) => {
      results.push({
        url: child.url,
        description: child.description,
      });
    });
    return results;
  };
  const handleSave = async () => {
    let invalidObj = Object.entries(listChild).find(([key, child], index) => {
      return child && !child.url;
    });

    if (!invalidObj) {
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res && +res.EC === 0) {
        toast.success(res.EM);
        setListChild({ child1: defaultChild });
        childRef.current.fetchListRolesAgain();
      } else {
        toast.error(res.EM);
      }
    } else {
      // error
      toast.error("Input url must not be empty...");
      let _listChild = _.cloneDeep(listChild);
      let key = invalidObj[0];
      _listChild[key]["isValidUrl"] = false;
      setListChild(_listChild);
    }
  };
  return (
    <>
      <div className="role-container">
        <div className="container">
          <div className="adding-role mt-3">
            <div className="title-role">
              <h4>Add a new Role</h4>
            </div>
            <div className="role-parent">
              {Object.entries(listChild).map(([key, child], index) => {
                return (
                  <div className="row role-child" key={`child-${key}`}>
                    <div className={`col-5 form-group ${key}`}>
                      <label>URL:</label>
                      <input
                        type="text"
                        className={child.isValidUrl ? "form-control" : "form-control is-invalid"}
                        value={child.url}
                        onChange={(event) => handleOnchangeInput("url", event.target.value, key)}
                      />
                    </div>
                    <div className="col-5 form-group">
                      <label>Description:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={child.description}
                        onChange={(event) => handleOnchangeInput("description", event.target.value, key)}
                      />
                    </div>
                    <div className="col-2 mt-4 actions">
                      <button className="btn btn-success" onClick={() => handleAddNewChild()}>
                        <i className="fa fa-plus"></i>
                      </button>
                      {index >= 1 && (
                        <button className="btn btn-danger" onClick={() => handleAddDeleteChild(key)}>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
                // Pretty straightforward - use key for the key and value for the value.
                // Just to clarify: unlike object destructuring, the parameter names don't matter here.
              })}
              <div className="mt-3">
                <button className="btn btn-warning" onClick={() => handleSave()}>
                  Save
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="mt-3">
            <h4>List Current Role</h4>
            <TableRole ref={childRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
