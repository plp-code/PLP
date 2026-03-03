export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative flex flex-col items-stretch min-h-screen overflow-hidden lg:h-screen lg:flex-row bg-plp-parchment"
    >
      <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
        <h2 className="text-4xl lg:text-7xl capitalize mb-4 leading-none">
          About Our Founders
        </h2>
        <p className="font-prata text-[10px] md:text-2xl text-plp-maroon/60 tracking-widest font-bold max-w-6xl leading-relaxed">
          Something here
        </p>
      </div>
    </section>
  );
}
