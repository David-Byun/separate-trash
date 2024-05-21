export default function Button({ text }: { text: string }) {
  return (
    <button className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed">
      {text}
    </button>
  );
}
