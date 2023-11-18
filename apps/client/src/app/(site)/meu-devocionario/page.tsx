"use client";
import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import { Heading } from "@components/Texts/Heading";
import { AuthContext } from "@contexts/Auth/AuthContext";
import { UserContext } from "@contexts/User/UserContext";
import UserPrayersList from "@sites/meu-devocionario/UserPrayersList";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function MyDevotionalBookPage() {
  const { user } = useContext(UserContext);
  const { signOut, isAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user && isAuthenticated === false) router.push("/login");
  }, [isAuthenticated, router, user]);

  if (!user) return;

  return (
    <PageContainer backButton={false}>
      <div className="flex items-center justify-between py-4 border-b border-gray-500">
        <Heading>{`Olá, ${user.name}!`}</Heading>
        <Button onClick={() => signOut()}>Sair</Button>
      </div>
      <Heading>Minhas Orações</Heading>
      <UserPrayersList />
    </PageContainer>
  );
}
