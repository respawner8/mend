export function Avatar({
  firstName, lastName, color, size = 48,
}: {
  firstName: string; lastName: string; color: string; size?: number;
}) {
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  const fontSize = Math.round(size * 0.36);
  return (
    <div
      aria-label={`${firstName} ${lastName}`}
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ background: color, width: size, height: size, fontSize }}
    >
      {initials}
    </div>
  );
}
