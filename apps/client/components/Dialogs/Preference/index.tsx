import PreferenceForm from "@/components/Forms/Config/Preference";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Gear } from "phosphor-react";

export default function PreferenceDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Gear className="mr-2" />
          Preferências
        </Button>
      </DialogTrigger>
      <DialogContent>
        <PreferenceForm />
      </DialogContent>
    </Dialog>
  );
}
