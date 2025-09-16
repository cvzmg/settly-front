import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const FindBest = () => {
  return(

    <Sheet >
      <SheetTrigger asChild>
        <div className="flex flex-row items-center justify-center h-full w-[35%] rounded-full bg-white hover:bg-gray-100 shadow-xl gap-2 cursor-pointer transition-colors duration-200">
          <Settings2 size={16} />
          <div className="text-sm leading-none font-semibold">Find Best</div>
        </div>
      </SheetTrigger>

      <SheetContent side="top" className="h-[35vh]">
      </SheetContent >
    </Sheet >
    
  );
};

const GeneralInterest = () => {
  return(
    <div className="h-full w-[15%] rounded-full bg-white shadow-xl">
    </div>
  );
};

const MainFilterSelector = () => {
  return(
    <div className="flex flex-row justify-between items-center w-[60%] h-[50%] ">
      <FindBest />
      <GeneralInterest />
      <GeneralInterest />
      <GeneralInterest />
      <GeneralInterest />
    </div>
  );
};
export default MainFilterSelector;
