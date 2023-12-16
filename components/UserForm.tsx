'use client';
import * as React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { UserQuery, userQuery } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { getArtistInfo } from '@/lib/spotify';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useUserInfoStore } from '@/hooks/user-info';

interface UserFormProps {
  token: string;
}

const UserForm: React.FC<UserFormProps> = ({ token }) => {
  const { setUser, artists } = useUserInfoStore();
  const form = useForm<UserQuery>({
    resolver: zodResolver(userQuery),

    defaultValues: {
      artistName: '',
    },
  });

  async function onSubmit(values: UserQuery) {
    try {
      const artistInfo = await getArtistInfo(
        { artistName: values.artistName },

        token
      );

      if (!artistInfo) return;

      setUser(artistInfo.artists);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {artists.length < 1 && (
          <FormField
            control={form.control}
            name='artistName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='e.g Kayakata' {...field} className='' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {!!artists.length ? 'That s it! ' : 'Next'}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
