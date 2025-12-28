const Section = ({ children, variant = "light", divider = false }) => {
  const bgMap = {
    white: "bg-white",
    light: "bg-slate-50",
    subtle: "bg-gray-100",
  };

  return (
    <section className={`relative w-full py-28 ${bgMap[variant]}`}>
      {divider && (
        <div className="absolute inset-x-0 top-0 h-px bg-gray-200" />
      )}
      {children}
    </section>
  );
};

export default Section;
