import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from '@/components/Input';

import { FieldValues, ResolverResult, ResolverOptions } from 'react-hook-form';

const inter = Inter({ subsets: ['latin'] })

const schema = z.object({
  name: z.string().min(1, { message: "Required" })
});

const schema2 = z.object({
  name2: z.string().min(1, { message: "Required" }),
  age: z.number().min(10, { message: 'Need to be at least years old' })
});

const schema3 = z.object({
  name3: z.string().min(1, { message: "Required" }),
})

function dynamicSchemaValidationResolver(values: any, schemaOptions: any, resolverOptions: any) {
  return zodResolver(values.name2 ? schema2.merge(schema3) : schema)(values, schemaOptions, resolverOptions)
}

export default function Home() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: dynamicSchemaValidationResolver
  });

  const name2 = watch('name2')
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form onSubmit={handleSubmit(_ => _)}>
        <Input {...register("name")} placeholder="name" errors={errors} />
        <Input {...register("name2")} placeholder="name2" errors={errors} />
        {name2 &&
          <>
            <Input {...register("age")} type="number" placeholder="age" errors={errors} />
            <Input {...register("name3")} placeholder="name3" errors={errors} />
          </>
        }
        <button type="submit">Send</button>
      </form>
    </main>
  )
}
