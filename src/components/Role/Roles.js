import { useState } from "react";
import "./Role.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
const Role = (props) => {
  const [listChild, setListChild] = useState({
    child1: { url: "", description: "" },
  });
  useEffect(() => {}, []);
  const handleOnchangeInput = (name, value, key) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;
    setListChild(_listChild);
  };
  const handleAddNewChild = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChild(_listChild);
  };
  const handleAddDeleteChild = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
  };
  return (
    <>
      <div className="role-container">
        <div className="container">
          <div className="mt-3">
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
                        className="form-control"
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
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
