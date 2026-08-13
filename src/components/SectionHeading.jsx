function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex flex-col ${alignment} max-w-2xl`}>
      {eyebrow && (
        <span className="mb-3 border border-caramel px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold text-espresso sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-sm leading-relaxed text-espresso/70 sm:text-base">{description}</p>}
    </div>
  )
}

export default SectionHeading
