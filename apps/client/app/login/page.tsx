import SignInForm from "@/components/Forms/Auth/SignIn";

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <SignInForm defaultValue="login" />
    </div>
  );
}
