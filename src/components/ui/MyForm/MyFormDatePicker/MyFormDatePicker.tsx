'use client';
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const MyFormDatePicker = ({
  name,
  label,
  labelClassName,
  inputClassName,
  value,
  onValueChange,
}: {
  name: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  value?: string | Date | null;
  onValueChange?: (newValue: string | Date | null) => void;
}) => {
  const { control, setValue } = useFormContext();

  // Watch the input field's value
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    setValue(name, value, { shouldValidate: false });
  }, [value, name, setValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange]);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col justify-center w-full">
            {label && (
              <p
                className={cn(
                  "ps-1 mb-2 text-text_color text-base font-normal leading-6",
                  labelClassName
                )}
              >
                {label}
              </p>
            )}
            <input
              {...field}
              type="date"
              className={cn(
                "w-full px-3 py-2 border rounded-lg text-text_color focus:ring-2 focus:ring-primary focus:outline-none",
                inputClassName
              )}
              placeholder="YYYY-MM-DD"
              onChange={(e) => field.onChange(e.target.value)} // Handle controlled input
              value={field.value || ""} // Controlled value
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default MyFormDatePicker;
