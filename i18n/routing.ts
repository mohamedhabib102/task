import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'ar',
  
  // Set locale prefix for URL
  localePrefix: 'as-needed' // We could use 'always' but 'as-needed' is cleaner if we want domain/ for arabic and domain/en for english. However, standard is 'always' or 'as-needed'.
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
