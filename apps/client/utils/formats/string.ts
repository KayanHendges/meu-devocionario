export const fullNameInitials = (fullName: string) => {
  const names = fullName.split(" ");
  const firstName = names.shift();
  const lastName = names.pop() || "";

  return firstName?.substring(0, 1) + (lastName.substring(0, 1) || "");
};
