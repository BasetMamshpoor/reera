import React from "react";
import Details from "./_components/Details";
import Edit from "./_components/Edit";

const Page = async ({searchParams}) => {
    const page = Number(searchParams.page || 1);
    return (
        <>
            <div className="w-full">
                <Details/>
                {/*<Edit/>*/}
            </div>
        </>
    );
};

export default Page;
