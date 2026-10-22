import { socialLinks } from '../data/socialLinks'

export default function SocialLinks() {
  const items = socialLinks.filter((item) => item.url)
  if (items.length === 0) return null

  return (
    <ul className="flex items-center justify-center gap-3">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            title={item.name}
            className="w-11 h-11 rounded-full flex items-center justify-center border border-ivory/40 text-ivory hover:bg-ivory hover:text-plum transition-colors"
          >
            <i className={`${item.icon} text-lg`} aria-hidden="true"></i>
          </a>
        </li>
      ))}
    </ul>
  )
}
