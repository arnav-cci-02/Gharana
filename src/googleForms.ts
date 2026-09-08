export const googleForms = {
  orderUrl: 'https://forms.gle/your-order-form',
  contactUrl: 'https://forms.gle/your-contact-form',
  giftingUrl: 'https://forms.gle/your-gifting-form',
  wholesaleUrl: 'https://forms.gle/your-wholesale-form',
  internationalUrl: 'https://forms.gle/your-international-form',
}

export const googleFormEntries = {
  orderSummary: 'entry.XXXXXXXX',
  customerName: 'entry.XXXXXXXX',
  phone: 'entry.XXXXXXXX',
  email: 'entry.XXXXXXXX',
  address: 'entry.XXXXXXXX',
}

export const buildOrderSummary = (items: Array<{ name: string; quantity: number; weight: string; price: number }>) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const lines = [
    'Order Summary',
    ...items.map((item) => `${item.quantity} × ${item.name} — ${item.weight}`),
    '',
    `Total Items: ${totalItems}`,
    `Cart subtotal: ₹${subtotal}`,
  ]

  return lines.join('\n')
}
