import React, { useEffect, useState } from "react";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import ButtonNavigation from "./ButtonNavigation";
import Template from "./Template";
import { useFormData } from "../../../context/FormHyarihattoContext";
import { useDebounce } from "../../../hooks/useDebonce";
import usePublicDataService from "../../../services/PublicService";
import StaticOptions from "../../../utils/StaticOptions";
import { useFormErrors } from "../../../context/FormErrorContext";

const IdentityFormHyarihatto: React.FC = () => {
  const { ButtonNext } = ButtonNavigation();
  const { formData, updateFormData } = useFormData();
  const { errors, updateError } = useFormErrors();
  // const [noreg, setNoreg] = useState(localStorage.getItem("noreg") || "")

  const [name, setName] = useState(localStorage.getItem("name") || "");
  const debouncedNoreg = useDebounce(formData.noreg, 1000);
  const { getUserByNoreg } = usePublicDataService();
  const { optionsShift } = StaticOptions();

  const handleChangeNoreg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    updateError("submissions", "userId", undefined);
    updateFormData(null, "noreg", value);
  };

  const fetchUserByNoreg = async () => {
    try {
      setName("Loading");
      const response = await getUserByNoreg(formData.noreg);
      setName(response?.data?.name);
      localStorage.setItem("name", response?.data?.name);
      updateFormData("submissions", "userId", response?.data?.id);
    } catch (error) {
      console.error(error);
      setName("");
      updateFormData("submissions", "userId", "");
      localStorage.setItem("name", "");
    }
  };

  useEffect(() => {
    if (formData.noreg !== "" && formData.noreg.length === 8) {
      fetchUserByNoreg();
    } else if (formData.noreg !== "") {
      updateError(null, "noreg", "Noreg tidak valid!");
    }
  }, [debouncedNoreg]);

  return (
    <div>
      <Template showBack>
        <div className="flex justify-center">
          <nav
            className="text-sm text-gray-600 mb-4 text-center"
            aria-label="Breadcrumb"
          >
            <ol className="list-none p-0 inline-flex items-center space-x-1">
              <li>
                <a
                  href="/"
                  className="text-brand-600 hover:underline font-medium"
                >
                  Home
                </a>
              </li>
              <li>
                <span className="mx-2">{">"}</span>
                <a
                  href="/member"
                  className="text-brand-600 hover:underline font-medium"
                >
                  Warehouse Member
                </a>
              </li>
              <li>
                <span className="mx-2">{">"}</span>
                <span className="text-gray-800 font-semibold">
                  Hyarihatto
                </span>
              </li>
            </ol>
          </nav>
        </div>
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
                // className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nomor Registrasi"
                value={formData.noreg}
                onChange={handleChangeNoreg}
                hint={errors.submissions?.userId}
                error={errors.submissions?.userId !== undefined}
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
                value={name}
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
                options={optionsShift}
                onChange={(name, value) =>
                  updateFormData("submissions", name, value)
                }
                defaultValue={formData.submissions.shift}
                hint={errors?.submissions?.shift}
                error={errors?.submissions?.shift !== undefined}
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
