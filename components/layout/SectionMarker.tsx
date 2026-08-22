type SectionMarkerProps = {
  index: string;
  label: string;
  className: string;
};

export function SectionMarker({ index, label, className }: SectionMarkerProps) {
  return (
    <div className={className} aria-label={`${index} — ${label}`}>
      <span aria-hidden="true">{index}</span>
      <span>{label}</span>
    </div>
  );
}
