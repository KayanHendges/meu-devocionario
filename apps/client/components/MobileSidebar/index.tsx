import { UserCircle } from "phosphor-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface Props {
  className?: string;
}

export default function MobileSidebar({ className }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild className="flex items-center justify-center">
        <Button className="ml-auto p-2" variant={"ghost"}>
          <UserCircle size={32} />
        </Button>
      </SheetTrigger>
      <SheetContent className={className}>teste</SheetContent>
    </Sheet>
  );
}
