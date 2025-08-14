import React,{useState,useEffect} from "react";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import ButtonVoice from "./ButtonVoice";
import TemplateVoiceMember from "./TemplateVoiceMember";
import { useFormData } from "../../../context/FormVoiceMemberContext";
import { useDebounce } from "../../../hooks/useDebonce";
import usePublicDataService from "../../../services/PublicService";
import StaticOptions from "../../../utils/StaticOptions";
import { useFormErrors } from "../../../context/FormErrorContext";

const IdentityFormVoiceMember: React.FC = () => {
  const { ButtonNext } = ButtonVoice();
  const { formData, updateFormData } = useFormData();
  const { errors, updateError } = useFormErrors();

  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [line, setLine] = useState(localStorage.getItem("line") || "");
  const [section, setSection] = useState(localStorage.getItem("section") || "");
  const debouncedNoreg = useDebounce(formData.noreg, 1000);
  const { getUserByNoreg } = usePublicDataService();
  const { optionsShift } = StaticOptions();



  const handleChangeNoreg = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
  
      updateError(null, "noreg", undefined);
      updateError("submissions", "userId", undefined);
      updateError("submissions", "sectionId", undefined);
      updateFormData(null, "noreg", value);
    };
  
    const handleChangeSelect = (name: string, value: string) => {
      updateError("submissions", name, undefined)
      updateFormData("submissions", name, value)
    }
  
    const fetchUserLineSection = async () => {
      try {
        setName("Loading");
        setLine("Loading");
        setSection("Loading");
        const response = await getUserByNoreg(formData.noreg);
  
        const data = response?.data
        setName(data?.name);
        setSection(data?.Organization?.Section?.sectionName)
        localStorage.setItem("name", data?.name);
        localStorage.setItem("section", data?.Organization?.Section?.sectionName);
        updateFormData("submissions", "userId", data?.id);
        updateFormData("submissions", "sectionId", data?.Organization?.sectionId);
  
        // Line
        if(!data?.Organization?.Line){
          setLine("-")
          localStorage.setItem("line", "-");
          updateFormData("submissions", "lineId", null);
        }else{
          setLine(data?.Organization?.Line?.lineName)
          localStorage.setItem("line", data?.Organization?.Line?.lineName);
          updateFormData("submissions", "lineId", data?.Organization?.lineId);
        }
      } catch (error) {
        console.error(error);
        setName("");
        setLine("");
        setSection("");
        updateFormData("submissions", "userId", "");
        updateFormData("submissions", "lineId", "");
        updateFormData("submissions", "sectionId", "");
        localStorage.setItem("name", "");
        localStorage.setItem("line", "");
        localStorage.setItem("section", "");
      }
    };

    const clearIdentityForm = () => {
      updateError(null, "noreg", "Noreg tidak valid!");
      setName("");
      setLine("");
      setSection("");
      updateFormData("submissions", "userId", "");
      updateFormData("submissions", "lineId", "");
      updateFormData("submissions", "sectionId", "");
      localStorage.setItem("name", "");
      localStorage.setItem("line", "");
      localStorage.setItem("section", "");
    }
  
    useEffect(() => {
        if (formData.noreg !== "" && formData.noreg.length === 8) {
          fetchUserLineSection();
        } else if (formData.noreg !== "" && formData.noreg.length !== 8) {
          clearIdentityForm()
        }
      }, [debouncedNoreg]);
  return (
    <div>
      <TemplateVoiceMember showBack>
        <div className="flex justify-center">
          <nav
            className="text-sm text-gray-600 mb-4 text-center"
            aria-label="Breadcrumb"
          >
            <ol className="list-none p-0 inline-flex items-center space-x-1">
              <li>
                <a
                  href="/"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Home
                </a>
              </li>
              <li>
                <span className="mx-2">{">"}</span>
                <a
                  href="/member"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Warehouse Member
                </a>
              </li>
              <li>
                <span className="mx-2">{">"}</span>
                <span className="text-gray-800 font-semibold dark:text-gray-300">
                  Voice Member
                </span>
              </li>
            </ol>
          </nav>
        </div>
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-lg p-6">
          <div className="border-b border-gray-200 pb-4 mb-6 text-center">
            <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Identitas Member
            </h5>
          </div>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="noreg"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400"
              >
                No.Reg (8 digit)<span className="text-red-500">*</span>
              </label>
              <Input
                id="noreg"
                type="text"
                name="noreg"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-500 sm:text-sm"
                placeholder="Nomor Registrasi"
                value={formData.noreg}
                onChange={handleChangeNoreg}
                hint={errors.noreg}
                error={errors.noreg !== undefined}
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400"
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400"
              >
                Line<span className="text-red-500">*</span>
              </label>
              <Input
                disabled
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                name="name"
                placeholder="Nama"
                value={line}
              />
            </div>
              <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400"
              >
                Section<span className="text-red-500">*</span>
              </label>
              <Input
                disabled
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                name="name"
                placeholder="Nama"
                value={section}
                error={errors.submissions?.sectionId !== undefined}
                hint={errors.submissions?.sectionId}
              />
            </div>
            <div>
              <label
                htmlFor="shift"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400" 
              >
                Shift<span className="text-red-500">*</span>
              </label>
              <Select
                name="shift"
                placeholder="Pilih shift"
                options={optionsShift}
                onChange={handleChangeSelect}
                defaultValue={formData.submissions.shift}
                hint={errors?.submissions?.shift}
                error={errors?.submissions?.shift !== undefined}
              />
            </div>
          </div>

          {ButtonNext(1)}
        </div>
      </TemplateVoiceMember>
    </div>
  );
};

export default IdentityFormVoiceMember;
