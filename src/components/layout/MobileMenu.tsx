import { X } from 'lucide-react'
import { siteImages } from '../../data'
type Props = { open: boolean; close: () => void; navigate: (to: string) => void }
export function MobileMenu({ open, close, navigate }: Props) { if (!open) return null; const links = [['Home','/'],['Shop','/shop'],['About us','/about'],['Gifting','/gifting'],['International','/international'],['Contact','/contact']]; return <div className="overlay menu-overlay"><aside className="mobile-panel"><div className="panel-head"><img src={siteImages.logo} alt="Gharana Makhana" /><button aria-label="Close menu" onClick={close}><X /></button></div><div className="mobile-links">{links.map(([label, path]) => <button key={path} onClick={() => { close(); navigate(path) }}>{label}</button>)}</div></aside></div> }
