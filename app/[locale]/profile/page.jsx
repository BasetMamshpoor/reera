import React from 'react';
import Sidebar from './_components/Sidebar';
import EditTransaction from './_components/EditInformation';
const Page = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                <Sidebar/>
                <div className="hidden lg:flex w-full">
                    <EditTransaction/>
                </div>
            </div>
        </>
    );
};

export default Page;