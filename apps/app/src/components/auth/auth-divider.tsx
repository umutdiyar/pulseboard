export function AuthDivider({ text = "veya e-posta ile" }: { text?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs font-medium text-gray-400">{text}</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}
