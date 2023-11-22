/* eslint-disable react-hooks/exhaustive-deps */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { fetchGroup, createNewUser, updateCurrentUser } from "../../services/userService";
import "./ModalUser.scss";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = (props) => {
  const { action, dataModalUser } = props;
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "male",
    groups: "",
  };

  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    groups: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [userGroup, setUserGroup] = useState([]);
  const [validInputs, setValidInputs] = useState(validInputsDefault);

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({ ...dataModalUser, groups: dataModalUser.Group ? dataModalUser.Group.id : '' });
    }
  }, [dataModalUser])

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroup && userGroup.length > 0) {
        setUserData({
          ...userData,
          groups: userGroup && userGroup.length > 0 ? userGroup[0].id : ''
        });
      }
    }
  }, [action])
  const getGroup = async () => {
    const response = await fetchGroup();
    if (response && +response.EC === 0) {
      setUserGroup(response.DT);
      if (response && response.DT.length > 0) {
        let groups = response.DT;
        setUserData({ ...userData, groups: groups[0].id });
      }
    } else {
      toast.error(response.EM);
    }
  };
  const handleOnchangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInputs = () => {
    //create user
    if (action === 'UPDATE') return true
    setValidInputs(validInputsDefault);
    let arr = ["email", "phone", "password", "groups"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    } return check;
  }; const handleConfirmUser = async () => {
    let check = checkValidateInputs();
    if (check === true) {
      let response = action === 'CREATE' ?
        await createNewUser({ ...userData, groupId: userData["groups"] })
        : await updateCurrentUser({ ...userData, groupId: userData["groups"] });
      if (response && +response.EC === 0) {
        props.onHide();
        toast.success(response.EM);
        setUserData(defaultUserData);
        setUserData({ ...defaultUserData, groups: userGroup && userGroup.length > 0 ? userGroup[0].id : '' });
      }
      if (response && +response.EC !== 0) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[response.DT] = false;
        setValidInputs(_validInputs);
        toast.error(response.EM);
      }
    }
  };

  const handleCloseModalUser = () => {
    props.onHide();
    setUserData(defaultUserData);
    setValidInputs(validInputsDefault);
  }
  return (
    <>
      <Modal size="lg" show={props.show}>
        <Modal.Header closeButton onHide={() => handleCloseModalUser()}>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="title">{props.action === "CREATE" ? "Create new user" : "Edit a user"}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 input-field">
              <i className="fas fa-envelope"></i>
              <input
                disabled={action === "CREATE" ? false : true}
                className={validInputs.email ? "form-control" : "is-invalid form-control"} type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(event) => handleOnchangeInput(event.target.value, "email")} />
              {validInputs.email === true && (
                <span className="is-val">
                  (<span className="red">*</span>)
                </span>
              )}
            </div>
            <div className="col-12 col-sm-6 input-field">
              <i className="fas fa-phone"></i>
              <input
                disabled={action === "UPDATE" ? true : false}
                className={validInputs.phone ? "form-control" : "is-invalid form-control"}
                type="text"
                value={userData.phone}
                placeholder="Phone Number"
                onChange={(event) => handleOnchangeInput(event.target.value, "phone")} />
              {validInputs.phone === true && (
                <span className="is-val">
                  (<span className="red">*</span>)
                </span>
              )}
            </div>
            <div className="col-12 col-sm-6 input-field mt-3">
              <i className="fas fa-user"></i>
              <input
                className={validInputs.username ? "form-control" : "is-invalid form-control"}
                type="text"
                value={userData.username}
                placeholder="Username" onChange={(event) => handleOnchangeInput(event.target.value, "username")} />
            </div>
            <div className="col-12 col-sm-6 input-field mt-3">
              {action === 'CREATE' &&
                <>
                  <i className="fas fa-lock"></i>
                  <input className={validInputs.password ? "form-control" : "is-invalid form-control"} type="password"
                    value={userData.password} placeholder="Password" onChange={(event) =>
                      handleOnchangeInput(event.target.value, "password")}
                  />
                  {validInputs.password === true && (
                    <span className="is-val">
                      (<span className="red">*</span>)
                    </span>
                  )}
                </>
              }
            </div>
            <div className="col-12 col-sm-12 input-field mt-3">
              <i className="fas fa-address-book"></i>
              <input className={validInputs.address ? "form-control" : "is-invalid form-control"} type="text"
                value={userData.address} placeholder="Address" onChange={(event) => handleOnchangeInput(event.target.value,
                  "address")}
              />
            </div>
            <div className="col-12 col-sm-6 mt-3 select">
              <label>Gender:</label>
              <select
                className="form-select form-control"
                value={userData.sex}
                onChange={(event) => handleOnchangeInput(event.target.value, "sex")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 select mt-3">
              <label>
                Group
                <span>
                  {" "}
                  (<span className="red">*</span>):
                </span>
              </label>
              <select className={validInputs.groups ? "form-select form-control" : "is-invalid form-select form-control"}
                onChange={(event) => handleOnchangeInput(event.target.value, "groups")}
                value={userData.groups}
              >
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? 'Save' : 'Update'}
          </Button>
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;