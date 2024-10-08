import { Loader2 } from "lucide-react";
import { Button } from "./button";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children: React.ReactNode;
}

export const SubmitButton = ({
  disabled,
  children,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button {...props} disabled={disabled}>
      {disabled ? (
        <>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};
