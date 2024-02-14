import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import { SignOut } from "phosphor-react";
import { useContext } from "react";

export default function SignOutButton() {
  const { signOut } = useContext(AuthContext);

  return (
    <Button variant={"ghost"} onClick={() => signOut()}>
      <SignOut className="mr-2" />
      Sair
    </Button>
  );
}
