"use client";
import SignInForm from "@/components/Forms/Auth/SignIn";
import { Heading } from "@/components/Texts/Heading";
import { Button, ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  isOpen?: boolean;
  onChange?: (value: boolean) => void;
  children?: ReactNode;
}

interface ISignInDialogContext {
  handleOpen: (value: boolean) => void;
}

export const SignInDialogContext = createContext({} as ISignInDialogContext);

export function SignInDialogProvider({
  onChange,
  isOpen: isOpenProps,
  children,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (value: boolean) => {
    setIsOpen(value);
    onChange && onChange(value);
  };

  return (
    <SignInDialogContext.Provider value={{ handleOpen }}>
      {children}
      <Dialog
        open={isOpenProps || isOpen}
        onOpenChange={() => handleOpen(false)}
        {...props}
      >
        <DialogContent>
          <DialogHeader>
            <Heading>Faça o seu login</Heading>
          </DialogHeader>
          <SignInForm defaultValue="login" onFinish={() => handleOpen(false)} />
        </DialogContent>
      </Dialog>
    </SignInDialogContext.Provider>
  );
}

interface TriggerButtonProps extends ButtonProps {}

export function SignInDialogTriggerButton({
  children,
  ...props
}: TriggerButtonProps) {
  const { handleOpen } = useContext(SignInDialogContext);

  return (
    <Button
      size={"sm"}
      variant={"default"}
      onClick={() => handleOpen(true)}
      {...props}
    >
      {children || "Entre com sua conta"}
    </Button>
  );
}
