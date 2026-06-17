import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ГДД за фирми — подаване преди 30 юни | Total Profit',
  description: 'Подаваме годишната данъчна декларация по чл. 92 ЗКПО на Вашата фирма. 15+ години опит, 0 глоби от НАП. Краен срок 30 юни — заявете сега.',
  alternates: {
    canonical: '/gdd',
  },
  openGraph: {
    title: 'ГДД за фирми — подаване преди 30 юни | Total Profit',
    description: 'Експресно подаване на ГДД за фирми (чл. 92 ЗКПО). Краен срок 30 юни.',
  },
  twitter: {
    title: 'ГДД за фирми — подаване преди 30 юни | Total Profit',
  },
}

export default function GDDLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
