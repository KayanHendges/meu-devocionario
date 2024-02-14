"use client";
import SignInForm from "@/components/Forms/Auth/SignIn";
import { Heading } from "@/components/Texts/Heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { useState } from "react";

interface Props {
  buttonText?: string;
  displayTrigger?: boolean;
  isOpen?: boolean;
  onChange?: (value: boolean) => void;
}

export default function SignInDialog({
  buttonText = "Entre com sua conta",
  displayTrigger = true,
  onChange,
  isOpen: isOpenProps,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (value: boolean) => {
    setIsOpen(value);
    onChange && onChange(value);
  };

  return (
    <Dialog
      open={isOpenProps || isOpen}
      onOpenChange={() => handleOpen(false)}
      {...props}
    >
      {displayTrigger && (
        <Button
          size={"sm"}
          variant={"default"}
          onClick={() => handleOpen(true)}
        >
          {buttonText}
        </Button>
      )}
      <DialogContent>
        <DialogHeader>
          <Heading>Faça o seu login</Heading>
        </DialogHeader>
        <SignInForm defaultValue="login" onFinish={() => handleOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
