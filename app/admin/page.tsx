import { DataTable } from '@/components/table/DataTable'
import StateCard from '@/components/StatCard'
import { getRecentAppointmentsList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { columns } from '@/components/table/columns'

const Admin = async () => {
    const appointments = await getRecentAppointmentsList();
    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <Link href="/" className='cursor-pointer'>
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={32}
                        width={162}
                        alt='Logo'
                        className='h-8 w-fit'
                    />
                </Link>
                <p className='text-16-semibold'>Admin Dashboard</p>
            </header>
            <main className='admin-main'>
                <section className='w-full space-y-4'>
                    <h1 className='header'>Welcome 👋</h1>
                    <p className='text-dark-700'>Start the day with managing new appointments</p>
                </section>
                <section className='admin-stat'>
                    {/* Render the stat card here */}
                    <StateCard
                        type="appointments"
                        count={appointments.scheduledCounts}
                        label="Scheduled appointments"
                        icon="/assets/icons/appointments.svg"
                    />
                    <StateCard
                        type="pending"
                        count={appointments.pendingCounts}
                        label="Pending appointments"
                        icon="/assets/icons/pending.svg"
                    />
                    <StateCard
                        type="cancelled"
                        count={appointments.cancelledCounts}
                        label="Cancelled appointments"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>

                {/* A data tabel */}
                {/* <DataTable
                    columns={columns}
                    data={appointments.documents}
                /> */}
                <DataTable columns={columns} data={appointments.documents} />

            </main>
        </div>
    )
}

export default Admin