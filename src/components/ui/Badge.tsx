export function Badge({ text }: { text: string }) {
  return (
    <span className="inline-block bg-[#4E2FD2] text-white text-xs font-bold px-2 py-1 rounded-full">
      {text}
    </span>
  );
}
