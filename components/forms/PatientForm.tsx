"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

// Enums are one the feature of typescript has which is not a type-level extention of 
// javascript. 
// Enums do allow the developers to define a set of named constants. Using enum can make it easier to document intent
// and prevent common mistakes such as misspelling constants.

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}


const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) => {
        // Here we need to take care of the submitting of the form. Upon submitting we need to create a new user.
        setIsLoading(true);
        try 
        {
            const userData = { name, email, phone };
            // now we need to store
            console.log({userData});
            const user = await createUser(userData);
            console.log({user})
            if (user) 
            {
                router.push(`/patients/${user.$id}/register`);
            }
        } catch (error) 
        {
            console.log(error);
        }
        setIsLoading(false);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there👋</h1>
                    <p className="text-dark-700">Schedule your first appointment</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="gautam899@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone No."
                    placeholder="0123456789"
                />
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm