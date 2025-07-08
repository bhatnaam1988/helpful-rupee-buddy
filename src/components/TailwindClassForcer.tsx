// This component forces Tailwind to generate fintech classes
// It's hidden but ensures all required classes are included in the build

const TailwindClassForcer = () => {
  return (
    <div className="hidden">
      {/* Force generate fintech color classes */}
      <div className="bg-fintech-primary bg-fintech-secondary bg-fintech-accent" />
      <div className="text-fintech-primary text-fintech-secondary text-fintech-accent" />
      <div className="text-fintech-text-primary text-fintech-text-secondary text-fintech-text-tertiary" />
      <div className="from-fintech-primary to-fintech-primary-light" />
      <div className="from-fintech-secondary to-fintech-secondary-light" />
      <div className="from-fintech-accent to-fintech-accent-light" />
      <div className="shadow-fintech shadow-fintech-lg shadow-success" />
      <div className="bg-fintech-surface bg-fintech-surface-elevated" />
    </div>
  );
};

export default TailwindClassForcer;