import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "../Login";
import RegisterForm from "../Register";

interface Props extends React.RefAttributes<HTMLDivElement> {
  onFinish?: () => void;
  defaultValue: "login" | "register";
}

export default function SignInForm({
  onFinish,
  defaultValue = "login",
  ...props
}: Props) {
  return (
    <Tabs defaultValue={defaultValue} {...props}>
      <TabsList className="w-full">
        <TabsTrigger className="flex-1" value="login">
          Já tenho conta
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="register">
          Criar uma conta
        </TabsTrigger>
      </TabsList>
      <div className="p-2">
        <TabsContent value="login">
          <LoginForm onFinish={onFinish} />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm onFinish={onFinish} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
