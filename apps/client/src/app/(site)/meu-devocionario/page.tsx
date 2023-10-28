"use client";
import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import { Heading } from "@components/Texts/Heading";
import LoginForm from "@components/forms/Auth/Login";
import { AuthContext } from "@contexts/Auth/AuthContext";
import { UserContext } from "@contexts/User/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function MyDevotionalBookPage() {
  const { user } = useContext(UserContext);
  const { signOut, isAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user && isAuthenticated === false) router.push("/login");
  }, [isAuthenticated, router, user]);

  return (
    <PageContainer backButton={false}>
      {user && (
        <div className="flex items-center justify-between">
          <Heading>{`Olá, ${user.name}!`}</Heading>
          <Button onClick={() => signOut()}>Sair</Button>
        </div>
      )}
    </PageContainer>
  );
}
