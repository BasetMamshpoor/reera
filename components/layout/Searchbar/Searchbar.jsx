import MobileSearch from "./MobileSearch";

import MainSearchbar from "../../MainSearchbar";

const Searchbar = () => {
  return (
    <>
      <div className="px-6">
        <MobileSearch />
      </div>
      {/* <DesktopSearch /> */}
      <MainSearchbar />
    </>
  );
};

export default Searchbar;
