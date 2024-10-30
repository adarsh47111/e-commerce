import React, { useState } from "react";
import Button from "./Button";
import { ArrowLeft } from "lucide-react";
import DateInputBox from "./DateInputBox";

const Profile = () => {
  if (window.outerWidth < 640) return <MobileVersion />;
  else return <DesktopVersion />;
};

export default Profile;

const DesktopVersion = () => {
  const [user_info, setUser_info] = useState({
    firstName: "Adarsh",
    lastName: "Goutam",
    email: "adarsh@gmail.com",
    phoneNumber: "9876543210",
    gender: "Male",
    DOB: "12/2/2002",
  });

  const [editState, setEditState] = useState(false);

  return (
    <div className="w-2/3">
      <div className="flex justify-between">
        <p className="text-xl text-primary font-medium h-11">Profile</p>
        {!editState && (
          <Button className="w-24 h-10" onClick={() => setEditState(true)}>
            Edit
          </Button>
        )}
      </div>
      <form className="w-full">
        <div className="flex justify-between my-6">
          <InputBlock
            label="First Name"
            value={user_info.firstName}
            setValue={(val) => setUser_info({ ...user_info, firstName: val })}
          />
          <InputBlock
            label="Last Name"
            value={user_info.lastName}
            setValue={(val) => setUser_info({ ...user_info, lastName: val })}
          />
        </div>
        <div className="flex justify-between my-6">
          <InputBlock
            label="Email"
            value={user_info.email}
            setValue={(val) => setUser_info({ ...user_info, email: val })}
          />
          <InputBlock
            label="Phone Number"
            type="number"
            value={user_info.phoneNumber}
            setValue={(val) => setUser_info({ ...user_info, phoneNumber: val })}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2 w-[48%]">
            <label>Gender</label>
            <select
              className="h-10 bg-neutral-100 text-neutral-500 px-4 rounded"
              onChange={(e) =>
                setUser_info({ ...user_info, gender: e.target.value })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2 w-[48%]">
            <label>Date of Birth</label>
            <DateInputBox
              date={user_info.DOB}
              setDate={(date) => setUser_info({ ...user_info, DOB: date })}
            />
          </div>
        </div>
        {editState && (
          <div className="flex justify-end space-x-3">
            <Button className="w-24" onClick={() => setEditState(false)}>
              Cancel
            </Button>
            <Button className="w-24">Save</Button>
          </div>
        )}
      </form>
    </div>
  );
};

const InputBlock = ({ label, type = "text", value, setValue, className }) => {
  return (
    <div className={`flex flex-col w-full sm:w-[48%] space-y-2 ${className}`}>
      <label>{label}</label>
      <input
        className={`bg-neutral-100 h-10 rounded px-4 text-neutral-500`}
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const MobileVersion = () => {
  const [user_info, setUser_info] = useState({
    firstName: "Adarsh",
    lastName: "Goutam",
    email: "adarsh@gmail.com",
    phoneNumber: "9876543210",
    gender: "Male",
    DOB: Date.now(),
  });

  const [editState, setEditState] = useState(false);

  return (
    <>
      <div className="pb-4">
        <div className="flex justify-between items-center  w-[60%] pl-4 py-3">
          <Button variant="icon">
            <ArrowLeft
              size={25}
              strokeWidth={2}
              onClick={() => window.history.back()}
            />
          </Button>
          <span className="text-xl font-bold">Profile</span>
        </div>

        <form className="flex flex-col items-center space-y-3 px-4">
          <InputBlock
            label="First Name"
            value={user_info.firstName}
            setValue={(val) =>
              setUser_info({ ...setUser_info, firstName: val })
            }
          />
          <InputBlock
            label="Last Name"
            value={user_info.lastName}
            setValue={(val) => setUser_info({ ...setUser_info, lastName: val })}
          />
          <InputBlock
            label="Email"
            value={user_info.email}
            setValue={(val) => setUser_info({ ...setUser_info, email: val })}
          />
          <InputBlock
            label="Phone Number"
            type="number"
            value={user_info.phoneNumber}
            setValue={(val) =>
              setUser_info({ ...setUser_info, phoneNumber: val })
            }
          />
          <div className="flex flex-col space-y-2 w-full">
            <label>Date of Birth</label>
            <DateInputBox
              date={user_info.DOB}
              setDate={(date) => setUser_info({ ...user_info, DOB: date })}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label>Gender</label>
            <select
              className="h-10 bg-neutral-100 px-4 rounded"
              onChange={(e) =>
                setUser_info({ ...user_info, gender: e.target.value })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {editState ? (
            <div className="space-x-3 w-full">
              <Button
                className="w-[48%] py-2 text-xl"
                onClick={() => setEditState(false)}
              >
                Cancel
              </Button>
              <Button className="w-[48%] py-2 text-xl">Save</Button>
            </div>
          ) : (
            <Button
              className="w-full py-2 text-xl"
              onClick={() => setEditState((n) => !n)}
            >
              Edit
            </Button>
          )}
        </form>
      </div>
    </>
  );
};
