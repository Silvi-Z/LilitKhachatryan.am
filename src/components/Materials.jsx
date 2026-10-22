import { articles } from '../data/articles'

export default function Materials() {
  return (
    <section id="materials" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-24">
      <div className="max-w-2xl mb-12 space-y-4">
        <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-plum leading-[1.1] tracking-tight text-balance">Նյութեր ծնողների համար</h2>
        <p className="text-ink/75 text-sm sm:text-base">Օգտակար նյութեր՝ երեխաների տարիքային առանձնահատկությունների և ծնողավարման վերաբերյալ։</p>
      </div>

      {articles.length === 0 ? (
        <div className="max-w-2xl border-l-4 border-berry pl-6 sm:pl-8 py-2 space-y-3">
          <div className="text-2xl text-berry"><i className="fa-solid fa-book-open" aria-hidden="true"></i></div>
          <p className="font-serif text-xl sm:text-2xl text-plum leading-snug">Շուտով այստեղ կգտնեք օգտակար նյութեր ծնողների համար։</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="bg-ivory border-t-4 border-berry p-7 flex flex-col justify-between">
              <div className="space-y-3">
                {article.ageGroup && (
                  <span className="tag px-3 py-1 rounded-full text-sm font-medium">{article.ageGroup}</span>
                )}
                <h3 className="font-serif text-xl font-semibold text-plum">{article.title}</h3>
                {article.description && (
                  <p className="text-ink/75 text-base leading-relaxed">{article.description}</p>
                )}
              </div>
              {(article.date || article.href) && (
                <div className="pt-5 flex items-center justify-between gap-3 text-sm">
                  {article.date ? <time className="text-ink/60 font-medium">{article.date}</time> : <span></span>}
                  {article.href && (
                    <a href={article.href} className="text-berry font-medium underline underline-offset-4 decoration-accent/40 hover:text-ink transition-colors">
                      Կարդալ ավելին
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
    </section>
  )
}
