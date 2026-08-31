type FormFieldErrorProps = {
  message?: string;
};

export function FormFieldError({ message }: FormFieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
      {message}
    </p>
  );
}
