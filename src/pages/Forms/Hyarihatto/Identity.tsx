import React from "react";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import ButtonNavigation from "./ButtonNavigation";
import Template from "./Template";

const IdentityFormHyarihatto: React.FC = () => {
  const { ButtonNext } = ButtonNavigation();

  return (
    <div>
      <Template showBack>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="border-b border-gray-200 pb-4 mb-6 text-center">
            <h5 className="text-xl font-semibold text-gray-800">
              Identitas Member
            </h5>
          </div>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="noreg"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                No.Reg<span className="text-red-500">*</span>
              </label>
              <Input
                id="noreg"
                type="text"
                name="noreg"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nomor Registrasi"
                // value={formData.noreg}
                // onChange={(e)=>setFormData({ ...formData, noreg: e.target.value})}
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama<span className="text-red-500">*</span>
              </label>
              <Input
                disabled
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                name="name"
                placeholder="Nama"
                // value={formData.name}
                // onChange={(e)=>handleChangeInput(e, "submissions")}
              />
            </div>
            <div>
              <label
                htmlFor="shift"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Shift<span className="text-red-500">*</span>
              </label>
              <Select
                name="shift"
                options={[]}
                onChange={() => {}}
                // options={optionsShift}
                // onChange={(name, value)=>handleChangeSelect(name, value, "submissions")}
                // defaultValue={formData.submissions.shift}
              />
            </div>
          </div>

          {ButtonNext(1)}
        </div>
      </Template>
    </div>
  );
};

export default IdentityFormHyarihatto;
