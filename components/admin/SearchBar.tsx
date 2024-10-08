import Image from "next/image";
import { Input } from "../ui/input";

const SearchBar = () => {
    return (
        <div className="relative flex-1">
            <Input
                className="h-10 bg-white pl-5 text-black-purple"
                placeholder="Search here"
            />
            <Image
                src="/assets/icons/search.svg"
                alt="search"
                width={20}
                height={20}
                className="absolute right-3 top-0 translate-y-1/2 cursor-pointer"
            />
        </div>
    );
};
export default SearchBar;
