import MobileSearch from "./MobileSearch";
import MainSearchbar from "../../MainSearchbar";

const Searchbar = () => {
    return (
        <div className="mb-4">
            <div className="px-6 pb-4">
                <MobileSearch/>
            </div>
            <MainSearchbar/>
        </div>
    );
};

export default Searchbar;
