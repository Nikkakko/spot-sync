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
import { linksFormSchema } from "@/lib/validation";
import { addLinksAction } from "@/app/_actions/links";
import { selectGroups, selectValues } from "@/app/helpers/siteData";

interface SocialLinkSetupProps {}

const SocialLinkSetup: React.FC<SocialLinkSetupProps> = ({}) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof linksFormSchema>>({
    resolver: zodResolver(linksFormSchema),
    defaultValues: {
      name: "",
      title: "",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof linksFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    startTransition(async () => {
      try {
        await addLinksAction(values);
        form.reset();
      } catch (error) {
        console.log(error);
      }
    });
  }

  const isSubmitting = form.formState.isSubmitting || isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 border border-neutral-800/20 rounded-lg p-4 "
      >
        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[150px]">
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
        <Button
          type="submit"
          disabled={isSubmitting}
          size="sm"
          className=" max-w-40"
        >
          {isSubmitting ? "Submitting..." : "Add Link"}
        </Button>
      </form>
    </Form>
  );
};

export default SocialLinkSetup;
