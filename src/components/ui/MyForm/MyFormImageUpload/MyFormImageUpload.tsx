/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type TImageUploadProps = {
  name: string;
  label?: string;
  size?: string;
  parentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  defaultValue?: string | StaticImport;
  [key: string]: any; // Allow other props
};

const MyFormImageUpload = ({
  name,
  label,
  size = "medium",
  parentClassName = "",
  labelClassName = "",
  inputClassName = "",
  defaultValue,
  ...rest
}: TImageUploadProps) => {
  const { control, setValue, resetField } = useFormContext();
  const [preview, setPreview] = useState<string | StaticImport | null>(
    defaultValue || null
  );
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string); // Set preview
    };
    reader.readAsDataURL(file);

    setValue(name, file); // Update form value
  };

  const handleRemoveImage = () => {
    setPreview(null); // Clear preview
    resetField(name); // Clear form value
    setFileInputKey((prev) => prev + 1); // Force file input reset
  };

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={cn(`form-group ${size}`, parentClassName)}>
      {label && <p className={cn("mb-2", labelClassName)}>{label}</p>}
      <Controller
        control={control}
        name={name}
        render={({ fieldState: { error } }) => (
          <>
            {preview ? (
              <div className="mb-2 relative w-fit">
                <Image
                  height={300}
                  width={300}
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-1 py-1 bg-black bg-opacity-80 text-white rounded-md absolute top-2 right-2"
                >
                  <RiDeleteBinLine size={20} className="hover:text-red-500" />
                </button>
              </div>
            ) : null}
            <input
              key={fileInputKey} // Force reset of input field
              id={name}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileChange(file);
                }
              }}
              className={cn(
                "w-full rounded-md border border-gray-300 p-2",
                inputClassName
              )}
              {...rest}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default MyFormImageUpload;
