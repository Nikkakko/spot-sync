"use client";
import * as React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { updateFormSchema } from "@/lib/validation";
import { updateProfileAction } from "@/app/_actions/userProfile";
import { useToast } from "../ui/use-toast";

import { UploadButton } from "@/utils/uploadthing";

interface GeneralFormProps {
  name: string | null;
  bio: string | null;
  profileUrl: string | null;
}

const GeneralForm: React.FC<GeneralFormProps> = ({ name, bio, profileUrl }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: name || "",
      bio: bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = await updateProfileAction(values);
    if (data.success) {
      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated successfully",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g Kayakata" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell your musical story with a splash of personality—share the quirks, the inspirations, and the wild ride that brought you to this adventure!"
                  {...field}
                  className="h-40 resize-y no-scrollbar"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Save
        </Button>
      </form>
    </Form>
  );
};

export default GeneralForm;
