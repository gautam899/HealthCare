import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import * as Sentry from "@sentry/nextjs";

const Register = async ({ params: { userId } }: SearchParamProps) => {
    // Now since the user is already authenticated so we get the user from the patient action.
    // We can create a new action that will help us to get the user from the userId.
    //Where do we get the userId from? From the params in the url.

    const user = await getUser(userId);

    Sentry.metrics.set("user_view_register", user.name);
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        alt="patient"
                        width={1000}
                        height={1000}
                        className="mb-12 h-10 w-fit"
                    />

                    <RegisterForm user={user} />
                    <p className="copyright py-12">© 2024 CareConnect</p>

                </div>
            </section>
            <Image
                src="/assets/images/register-img.png"
                alt="patient"
                width={1000}
                height={1000}
                className="side-img max-w-[40%]"
            />
        </div>
    )
}

export default Register 