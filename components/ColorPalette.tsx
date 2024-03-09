"use client";
import * as React from "react";
import { collorPalette } from "@/app/helpers/siteData";
import { useTheme } from "next-themes";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useThemeChoose } from "@/store/themeStore";

interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {}

const ColorPalette: React.FC<ColorPaletteProps> = ({ ...props }) => {
  const { setTheme, theme } = useTheme();
  const { setSelectedTheme } = useThemeChoose();
  const { control } = useFormContext(); // retrieve all hook methods\

  // console.log(theme);

  return (
    <div className={cn("flex items-center gap-2", props.className)}>
      <FormField
        control={control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              {/* select colors */}
              <RadioGroup
                {...field}
                onValueChange={value => {
                  field.onChange(value);
                  setTheme(value.toLowerCase());
                }}
                value={field.value}
                className="flex items-center gap-2"
              >
                {collorPalette.map(color => (
                  <RadioGroupItem
                    key={color.name}
                    value={color.name}
                    className="w-6 h-6 select-none  rounded-full cursor-pointer transition duration-300 ease-in-out hover:scale-110 transform hover:shadow-lg"
                    style={{ backgroundColor: color.color }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ColorPalette;
