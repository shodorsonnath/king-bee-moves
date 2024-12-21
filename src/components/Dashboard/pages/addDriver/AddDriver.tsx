/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import { Button } from "@nextui-org/react";
import DnDInput from "@/components/ui/DnDInput";
import { driverSchema } from "@/schema/driverSchema";
import MyFormDatePicker from "@/components/ui/MyForm/MyFormDatePicker/MyFormDatePicker";
import { useRouter } from "next/navigation";

export default function AddDriver() {
  const router = useRouter();
  const handleSubmit = (formData: any, reset: () => void) => {
    console.log(formData);
    reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h1 className="text-2xl font-medium py-3">Add New Driver</h1>
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(driverSchema)}
        className="space-y-6 mt-4"
      >
        <div className="grid grid-cols-1 gap-6 text-start">
          <div className="grid gap-6 col-span-1 sm:col-span-3 text-start">
            <div className="space-y-2">
              <MyFormInput
                inputClassName="text-text_color"
                name="name"
                label="Driver Name"
                type="text"
                placeHolder="Kathryn Morphy"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <MyFormInput
                  inputClassName="text-text_color"
                  name="phone"
                  label="Phone Number"
                  type="number"
                  placeHolder="1645879329"
                />
              </div>
              <div className="space-y-2">
                <MyFormDatePicker
                  name="date"
                  label="Join Date"
                  inputClassName="text-text_color"
                  value={null} // Initial value if required
                  onValueChange={(newValue) =>
                    console.log("Date changed:", newValue)
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <DnDInput
              width="w-full"
              name="driverImage"
              label="Driver Image"
              acceptedTypes="image"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            className="bg-white text-base font-light rounded-full py-[25px] text-text_color border"
            type="reset"
            onClick={() => router.back()}
          >
            cancel
          </Button>
          <Button
            className="bg-primary rounded-full text-base font-light  py-[25px] text-white"
            type="submit"
          >
            Save
          </Button>
        </div>
      </MyFormWrapper>
    </div>
  );
}
