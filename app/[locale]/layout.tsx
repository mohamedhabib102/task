import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { PageLoader } from '@/components/ui/PageLoader';
import '../globals.css';

const seoData: Record<string, { title: string; description: string; locale: string }> = {
  ar: {
    title: 'سيرف فايف | نبتكر حلولاً... تصنع الفارق',
    description:
      'سيرف فايف شركة رقمية متخصصة في تصميم المواقع الإلكترونية، تطوير المتاجر، برمجة التطبيقات، التسويق الرقمي، وحلول الذكاء الاصطناعي. نقدم خبرة تمتد لأكثر من 15 عامًا لمساعدة الشركات ورواد الأعمال على الانطلاق في العالم الرقمي بثقة.',
    locale: 'ar_SA',
  },
  en: {
    title: 'Serv5 | We Innovate Solutions That Make a Difference',
    description:
      'Serv5 is a full-service digital agency specializing in website design, e-commerce development, mobile app programming, digital marketing, SEO, and AI solutions. With over 15 years of experience, we help businesses and entrepreneurs launch and grow with confidence in the digital world.',
    locale: 'en_US',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = seoData[locale] ?? seoData.en;
  const baseUrl = 'https://serv5.com';

  return {
    title: seo.title,
    description: seo.description,
    metadataBase: new URL(baseUrl),
    keywords:
      locale === 'ar'
        ? ['تصميم مواقع', 'تطوير تطبيقات', 'تسويق رقمي', 'ذكاء اصطناعي', 'سيرف فايف', 'متاجر إلكترونية', 'SEO']
        : ['website design', 'app development', 'digital marketing', 'AI solutions', 'Serv5', 'e-commerce', 'SEO'],
    authors: [{ name: 'Serv5', url: baseUrl }],
    creator: 'Serv5',
    publisher: 'Serv5',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: [
        { url: '/images/logo.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/images/logo.svg',
      apple: '/images/logo.svg',
    },
    openGraph: {
      type: 'website',
      url: `${baseUrl}/${locale}`,
      title: seo.title,
      description: seo.description,
      siteName: 'Serv5',
      locale: seo.locale,
      images: [
        {
          url: '/images/logo.svg',
          width: 512,
          height: 512,
          alt: 'Serv5 Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/images/logo.svg'],
      creator: '@serv5com',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'ar': `${baseUrl}/ar`,
        'en': `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';
  const fontFamily = isAr
    ? '"Alexandria", sans-serif'
    : '"Rubik", sans-serif';

  const styles = {
    fontFamily,
    '--font-sans': fontFamily,
  } as React.CSSProperties;

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800;900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-white min-h-screen relative overflow-x-hidden" style={styles}>
        {/* Background Overlay */}
        <div className="fixed inset-0 z-[-2] bg-[#0c1445]/70" style={{
          backgroundImage: "url('/images/bg-body.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay"
        }}></div>

        <NextIntlClientProvider messages={messages}>
          <PageLoader />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
