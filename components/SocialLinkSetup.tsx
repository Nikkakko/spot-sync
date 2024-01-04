"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectSeparator,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef } from "@/utils/store";

interface SocialLinkSetupProps {}

const selectGroups = ["General", "Socials", "Streaming"];
const selectValues = [
  {
    id: 1,
    group: "General",
    values: ["Website", "Email", "Phone", "Address", "Location"],
  },
  {
    id: 2,
    group: "Socials",
    values: [
      "Facebook",
      "X",
      "Instagram",
      "TikTok",
      "YouTube",
      "Snap",
      "Twitch",
      "Wikipedia",
    ],
  },
  {
    id: 3,
    group: "Streaming",
    values: [
      "YouTube Music",
      "Spotify",
      "Apple Music",
      "SoundCloud",
      "Deezer",
      "Vimeo",
    ],
  },
];

const formSchema = z.object({
  category: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
});

const SocialLinkSetup: React.FC<SocialLinkSetupProps> = ({}) => {
  const { ref } = useRef();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        ref={ref}
        className="flex flex-col space-y-4 border border-neutral-800/20 rounded-lg p-4"
      >
        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-[130px]">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectGroups.map(group => (
                          <React.Fragment key={group}>
                            <SelectLabel className="px-1">{group}</SelectLabel>
                            {selectValues.map(value => (
                              <React.Fragment key={value.id}>
                                {value.group === group &&
                                  value.values.map(val => (
                                    <SelectItem key={val} value={val}>
                                      {val}
                                    </SelectItem>
                                  ))}
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Follow me on Facebook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="uppercase">Url</FormLabel>
              <FormControl>
                <Input placeholder="Type or paste your link here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
};

export default SocialLinkSetup;
