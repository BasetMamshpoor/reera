import MobileSearch from "./MobileSearch";
import MainSearchbar from "../../MainSearchbar";
import {categories} from "@/data/mock";

const Searchbar = () => {
    return (
        <>
            <div className="px-6">
                <MobileSearch/>
            </div>
            {/* <DesktopSearch /> */}
            <MainSearchbar categories={categories}/>
        </>
    );
};

export default Searchbar;
