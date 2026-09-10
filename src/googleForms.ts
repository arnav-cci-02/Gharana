export const googleForms = {
  order: {
    publicUrl: 'https://forms.gle/oiYFj3FCqFzg4ef7A',
    prefillBaseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfc4-1sqsvCKdymeYe4TVWvsn9vJYgJuoXKVgHIimNiS2v21g/viewform',
    fields: {
      orderDetails: 'entry.2051627265',
      orderTotal: 'entry.839337160',
    },
  },
  giftingUrl: 'https://forms.gle/rNSoWGCun7rL8CmE7',
  businessUrl: 'https://forms.gle/QEKquHnqxfS3NTzz7',
  contactUrl: 'https://forms.gle/Rvy6vRNeDSZgWfh97',
}

export const buildOrderSummary = (
  items: Array<{ name: string; quantity: number }>,
  subtotal: number,
) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const lines = [
    'Gharana Order',
    ...items.map((item) => `${item.name} × ${item.quantity}`),
    '',
    `Total Items: ${totalItems}`,
    `Total: ₹${subtotal.toLocaleString('en-IN')}`,
  ]

  return lines.join('\n')
}
