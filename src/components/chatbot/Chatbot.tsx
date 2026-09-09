import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { products } from "../../data";
import { googleForms } from "../../googleForms";

type Role = "assistant" | "user";
type ChatMessage = { id: string; role: Role; text: string; productId?: number };
type Props = { navigate: (to: string) => void; hidden?: boolean };

const messagesKey = "gharana_chat_messages";
const stateKey = "gharana_chat_state";
const flavourOptions = ["CHEESY", "SPICY", "CLASSIC", "SWEET", "SALTY"];

function initialMessages(): ChatMessage[] {
  return [
    { id: "welcome", role: "assistant", text: "Hey! Looking for your next crunch?" },
    { id: "prompt", role: "assistant", text: "Pick what you need help with." },
  ];
}

export function Chatbot({ navigate, hidden = false }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try { return JSON.parse(localStorage.getItem(messagesKey) || "null") || initialMessages(); } catch { return initialMessages(); }
  });
  const [flow, setFlow] = useState<string>(() => localStorage.getItem(stateKey) || "menu");
  const [draft, setDraft] = useState("");
  const quickActions = useMemo(() => flow === "flavour" ? flavourOptions : ["SHOP PRODUCTS", "FIND MY FLAVOUR", "GIFT PACKS", "ORDER HELP", "BULK ORDERS", "CONTACT US"], [flow]);

  useEffect(() => { localStorage.setItem(messagesKey, JSON.stringify(messages)); localStorage.setItem(stateKey, flow); }, [messages, flow]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const addMessage = (role: Role, text: string, productId?: number) => setMessages((current) => [...current, { id: `${Date.now()}-${current.length}`, role, text, productId }]);
  const handleAction = (action: string) => {
    addMessage("user", action);
    if (flow === "flavour") {
      const map: Record<string, string> = { CHEESY: "cheese-makhana", SPICY: "peri-peri-makhana", CLASSIC: "classic-roasted-makhana", SWEET: "chocolate-coated-makhana", SALTY: "salted-makhana" };
      const product = products.find((item) => item.slug === map[action]);
      if (product) addMessage("assistant", `Try ${product.name}. It is a ${product.shortDescription.toLowerCase()}`, product.id);
      setFlow("menu");
      return;
    }
    const responses: Record<string, () => void> = {
      "SHOP PRODUCTS": () => { addMessage("assistant", "Taking you to the full Gharana range."); navigate("/shop"); setOpen(false); },
      "FIND MY FLAVOUR": () => { addMessage("assistant", "What kind of flavour are you in the mood for?"); setFlow("flavour"); },
      "GIFT PACKS": () => { addMessage("assistant", "Our gifting edit is ready when you are."); navigate("/gifting"); setOpen(false); },
      "ORDER HELP": () => addMessage("assistant", "Choose a product, add it to your bag, then use Place order. We finish the order through the configured Google Form."),
      "BULK ORDERS": () => { addMessage("assistant", "Opening the wholesale enquiry form."); window.open(googleForms.wholesaleUrl, "_blank", "noopener,noreferrer"); },
      "CONTACT US": () => { addMessage("assistant", "Opening the contact page."); navigate("/contact"); setOpen(false); },
    };
    responses[action]?.();
  };
  const sendDraft = () => { const text = draft.trim(); if (!text) return; addMessage("user", text); addMessage("assistant", "I can help with products, flavours, gifting, orders, or contact. Pick an option below."); setDraft(""); };
  const clearChat = () => { setMessages(initialMessages()); setFlow("menu"); };

  if (hidden) return null;
  return <>
    {open && <section className="chat-panel" role="dialog" aria-label="Gharana assistant">
      <header className="chat-head"><div><b>GHARANA ASSISTANT</b><span>Here to help</span></div><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button></header>
      <div className="chat-messages">{messages.map((message) => <div key={message.id} className={`chat-message ${message.role}`}><p>{message.text}</p>{message.productId && <button onClick={() => { const item = products.find((product) => product.id === message.productId); if (item) { navigate(`/product/${item.slug}`); setOpen(false); } }}>View product →</button>}</div>)}</div>
      <div className="chat-actions">{quickActions.map((action) => <button key={action} onClick={() => handleAction(action)}>{action}</button>)}</div>
      <div className="chat-input"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendDraft(); }} placeholder="Ask Gharana" aria-label="Chat message" /><button onClick={sendDraft} aria-label="Send message"><Send size={15} /></button></div>
      <button className="chat-clear" onClick={clearChat}>Start over</button>
    </section>}
    <button className="chat-launcher" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close Gharana chat" : "Open Gharana chat"}><MessageCircle size={20} /><span>CHAT WITH US</span></button>
  </>;
}
