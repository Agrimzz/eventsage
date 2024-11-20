"use client"
import { adminFormSchema } from "@/lib/validator"
import {
  Alert,
  Button,
  Container,
  PasswordInput,
  TextInput,
} from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { IconAlertCircle, IconMail, IconPassword } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const AdminLogin = () => {
  const router = useRouter()
  const [error, setError] = useState<boolean>(false)
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(adminFormSchema),
  })

  const handleSubmit = () => {
    if (
      form.values.email === "admin@eventsage.np" &&
      form.values.password === "admin"
    ) {
      console.log(form.values.email)
      router.push("/admin/dashboard")
    } else {
      setError(true)
    }
  }
  return (
    <div className="w-screen h-screen bg-primary flex items-center justify-center">
      <Container size="md" p="xl" bg="white" className="rounded-lg shadow-2xl">
        <p className="text-3xl font-bold">EventSage Admin Login</p>
        <form onSubmit={form.onSubmit(handleSubmit)} className="mt-7">
          <TextInput
            label="Email"
            placeholder="Email"
            required
            size="lg"
            leftSection={<IconMail />}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            required
            size="lg"
            mt="md"
            leftSection={<IconPassword />}
            {...form.getInputProps("password")}
          />
          <Button type="submit" size="lg" fullWidth bg="#2B64EE" mt="xl">
            Login
          </Button>
        </form>

        {error && (
          <Alert
            mt="md"
            color="red"
            radius="md"
            icon={<IconAlertCircle size={16} />}
            title="Invalid Credentials"
          />
        )}
      </Container>
    </div>
  )
}

export default AdminLogin
