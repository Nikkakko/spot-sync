"use client";
import * as React from "react";
import DefaultTheme from "../themes/DefaultTheme";
import PopTheme from "../themes/PopTheme";
import { cn } from "@/lib/utils";
import { FormField } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { useModalStore } from "../modals/ModalStore";

interface ThemesProps {
  image: string;
  name: string;
  coverImage: string;
  isPro: boolean;
}

const Themes: React.FC<ThemesProps> = ({ image, name, coverImage, isPro }) => {
  const { control } = useFormContext();
  const { onOpen } = useModalStore();

  const themeClass = cn(
    "border-2 rounded-sm cursor-pointer p-2 hover:scale-105 transition duration-300 ease-in-out"
  );

  return (
    <div className="flex items-start  gap-2  py-2 px-2 rounded-md">
      <div className="flex flex-col gap-6 flex-1">
        <FormField
          control={control}
          name="theme"
          render={({ field }) => (
            <DefaultTheme
              {...field}
              image={image}
              name={name}
              className={cn(
                themeClass,
                field.value.type === "DEFAULT" ? "border-black" : "border-white"
              )}
              onClick={async e => {
                e.stopPropagation();
                e.nativeEvent.preventDefault();

                field.onChange({ type: "DEFAULT", color: "DEFAULT" });
              }}
            />
          )}
        />
        <FormField
          control={control}
          name="theme"
          render={({ field }) => (
            <>
              <PopTheme
                image={image}
                name={name}
                coverImage={coverImage}
                className={cn(
                  themeClass,
                  field.value.type === "POP" ? "border-black" : "border-white"
                )}
                onClick={async e => {
                  if (!isPro) {
                    return onOpen("subscription");
                  }
                  e.stopPropagation();
                  e.nativeEvent.preventDefault();

                  field.onChange({ type: "POP", color: "DEFAULT" });
                }}
              />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default Themes;
