import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import Seprator from "./Seprator";

const AddressBook = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [editAddressData, setEditAddressData] = useState("");
  const [openEditBox, setOpenEditBox] = useState(false);
  const addressList = {
    defaultAddress: {
      id: "mdabna",
      firstName: "Adarsh",
      lastName: "Goutam",
      address: {
        street: "14/2, sarda nagar, chandibaria",
        locality: "Krishnapur  (North 24 Parganas)",
        city: "Kolkata",
        state: "West Bengal",
        pincode: "700102",
      },
      phoneNumber: "8789476564",
      type: "Home",
      isDefault: "true",
    },
    otherAddresses: [
      {
        id: "sfjksh",
        firstName: "Adarsh",
        lastName: "Goutam",
        address: {
          street: "14/2, sarda nagar, chandibaria",
          locality: "Krishnapur  (North 24 Parganas)",
          city: "Kolkata",
          state: "West Bengal",
          pincode: "700102",
        },
        phoneNumber: "8789476564",
        type: "Home",
        isDefault: "false",
      },
      {
        id: "gkjls",
        firstName: "Adarsh",
        lastName: "Goutam",
        address: {
          street:
            "Jitendra Singh, Jalapur, Tarwara, Siwan. Tarwara jalapur gaon ",
          locality: "Tarwara",
          city: "Siwan",
          state: "BIHAR",
          pincode: "841506",
        },
        phoneNumber: "8789476564",
        type: "Home",
        isDefault: "false",
      },
    ],
  };

  useEffect(() => {
    setSelectedAddress(addressList.defaultAddress.id);
  }, []);

  return (
    <>
      {openEditBox && (
        <EditBox
          {...{ editAddressData, open: openEditBox, setOpen: setOpenEditBox }}
        />
      )}
      <div className="p-2 sm:w-[60%]">
        <div className="flex justify-between items-center">
          <p className="text-xl text-primary font-medium">Saved Addresses</p>
          <Button variant="outline" className="h-10 text-primary">
            Add New Address
          </Button>
        </div>
        <div className="my-2 space-y-4">
          <div>
            <p className=" text-neutral-500 text-sm font-bold tracking-wider">
              DEFAULT ADDRESS
            </p>
            {addressList && addressList.defaultAddress && (
              <AddressCard
                {...{
                  ...addressList.defaultAddress,
                  selectedAddress,
                  setSelectedAddress,
                  setOpenEditBox,
                }}
              />
            )}
          </div>
          <div>
            <p className=" text-neutral-500 text-sm font-bold tracking-wider">
              OTHER ADDRESSES
            </p>
            {addressList &&
              addressList.otherAddresses?.map((address) => (
                <AddressCard
                  key={address.id}
                  {...{
                    ...address,
                    selectedAddress,
                    setSelectedAddress,
                    setOpenEditBox,
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressBook;

const AddressCard = ({
  id,
  firstName,
  lastName,
  address,
  phoneNumber,
  type,
  isDefault,
  selectedAddress,
  setSelectedAddress,
  setOpenEditBox,
}) => {
  isDefault = isDefault === "true";
  return (
    <div
      className="border space-y-4 p-3 my-2 rounded shadow hover:shadow-md transition-shadow"
      onClick={() => setSelectedAddress(id)}
    >
      <div className="flex justify-between">
        <span className=" text-neutral-500 font-medium">
          {firstName + " " + lastName}
        </span>
        <span className="border rounded-3xl p-1 px-3 text-xs font-medium bg-black bg-opacity-10">
          {type}
        </span>
      </div>
      <div className=" text-neutral-500 text-sm">
        <address>{address.street}</address>
        <address>{address.locality}</address>
        <address>{address.city}</address>
        <address>
          {address.state} <span>-{address.pincode}</span>
        </address>
      </div>
      <p className=" text-neutral-500 text-sm">
        Mobile: <i>{phoneNumber}</i>
      </p>
      {!isDefault && (
        <button className=" text-green-500 text-xs font-bold">
          MAKE THIS DEFAULT
        </button>
      )}
      {selectedAddress === id && (
        <div className="flex border rounded p-1">
          <Button
            variant="ghost"
            className="w-[48%] text-primary"
            onClick={() => setOpenEditBox((n) => !n)}
          >
            Edit
          </Button>
          <div className="w-[1px] mx-1 bg-black opacity-10"></div>
          <Button variant="ghost" className="w-[48%] text-primary">
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

const InputBlock = ({ label, type = "text", value, setValue, className }) => {
  return (
    <div className={`flex flex-col w-full border-black ${className}`}>
      <label className="text-xs">{label}</label>
      <input
        className={`h-8 rounded border-b text-neutral-500`}
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const EditBox = ({ open, setOpen, editAddressData }) => {
  const {
    id,
    firstName,
    lastName,
    street,
    locality,
    city,
    state,
    pincode,
    phoneNumber,
    type,
    isDefault,
  } = editAddressData;
  const editBoxRef = useRef(null);
  const [address, setAddress] = useState({
    firstName,
    lastName,
    street,
    locality,
    city,
    state,
    pincode,
    phoneNumber,
    type,
    isDefault,
  });

  useEffect(() => {
    console.log(editBoxRef);
    if (open) editBoxRef.current && disableBodyScroll(editBoxRef.current);
    else editBoxRef.current && enableBodyScroll(editBoxRef.current);

    return () => clearAllBodyScrollLocks();
  }, [open]);

  return (
    <div className="flex sm:justify-center sm:items-center fixed top-0 left-0 h-screen w-screen z-10  bg-black bg-opacity-30">
      <div ref={editBoxRef} className="h-[84%] w-full sm:h-[70%] sm:w-[30%]">
        <div className="flex sm:sticky sm:top-0 z-10 bg-white justify-center items-center h-16 border font-semibold">
          <p>EDIT ADDRESS</p>
        </div>
        <form className="border h-full bg-white overflow-y-scroll">
          <Seprator className="h-[7px] my-[0px] opacity-25" />
          <div className="p-4 space-y-6">
            <div className="flex justify-between">
              <InputBlock
                className="w-[48%]"
                label="First Name *"
                value={address.firstName}
                setValue={(val) => setAddress({ ...address, firstName: val })}
              />
              <InputBlock
                className="w-[48%]"
                label="Last Name *"
                value={address.lastName}
                setValue={(val) => setAddress({ ...address, lastName: val })}
              />
            </div>
            <InputBlock
              label="Mobile *"
              type="number"
              value={address.phoneNumber}
              setValue={(val) => setAddress({ ...address, phoneNumber: val })}
            />
          </div>
          <Seprator className="h-[7px] opacity-25" />

          <div className="px-4 space-y-6">
            <div className="flex justify-between">
              <InputBlock
                className="w-[48%]"
                label="Pincode *"
                type="number"
                value={address.pincode}
                setValue={(val) => setAddress({ ...address, pincode: val })}
              />
              <InputBlock
                className="w-[48%]"
                label="State *"
                value={address.state}
                setValue={(val) => setAddress({ ...address, state: val })}
              />
            </div>
            <InputBlock
              label="Adress (House No., Building, Street, Area) *"
              value={address.street}
              setValue={(val) => setAddress({ ...address, street: val })}
            />
            <InputBlock
              label="Locality/ Town *"
              value={address.locality}
              setValue={(val) => setAddress({ ...address, locality: val })}
            />
            <InputBlock
              label="City/ District *"
              value={address.city}
              setValue={(val) => setAddress({ ...address, city: val })}
            />
          </div>
          <Seprator className="h-[7px] opacity-25" />
          <div className="px-4 space-y-6">
            <div>
              <label className="text-xs">Type of Address *</label>
              <div className="flex space-x-3">
                <div className="flex space-x-2">
                  <input type="radio" name="type" id="home" />
                  <label className="text-neutral-500" htmlFor="home">
                    Home
                  </label>
                </div>
                <div className=" space-x-2">
                  <input type="radio" name="type" id="office" />
                  <label className="text-neutral-500" htmlFor="office">
                    Office
                  </label>
                </div>
              </div>
            </div>
            <Seprator className=" opacity-25" />
            <div className="flex items-center space-x-4">
              <input
                className="h-full bg-primary"
                type="checkbox"
                name="isDefault"
                id="default"
              />
              <label className="text-sm text-neutral-500" htmlFor="default">
                Make this as my default address
              </label>
            </div>
          </div>
          <div className="mt-4 border sticky bg-white bottom-0">
            <Button
              variant="ghost"
              className="w-1/2 rounded-none"
              onClick={() => setOpen((n) => !n)}
            >
              Cancel
            </Button>
            <Button variant="ghost" className="w-1/2 rounded-none">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
