import { ArrowLeft } from 'lucide-react'
export function NotFound({ navigate }: { navigate: (to: string) => void }) { return <div className="not-found page-content"><p className="kicker">404 / Wrong turn</p><h1>Nothing<br/><em>crunchy</em><br/>here.</h1><button className="button button-dark" onClick={() => navigate('/')}>Back home <ArrowLeft size={16}/></button></div> }
