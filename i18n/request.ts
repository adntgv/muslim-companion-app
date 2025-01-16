import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import enMessages from '../messages/en.json';
import { IntlError } from 'next-intl';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();

  let messages;
  try {
    // Load the requested locale
    const localeMessages = (await import(`../messages/${locale}.json`)).default;
    
    // Deep merge with English messages to ensure fallback for missing translations
    messages = locale === 'en' ? localeMessages : deepMerge(enMessages, localeMessages);
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    // Fallback to English messages if loading fails
    messages = enMessages;
  }

  return {
    messages,
    // Define a fallback mechanism for missing translations
    onError: (error: IntlError) => {
      console.warn('Translation error:', error);
      // Return the message key as fallback
      return error.message || '';
    }
  };
});

// Helper function to deep merge objects
function deepMerge(target: any, source: any): any {
  const output = { ...target };
  
  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object') {
      if (!(key in target)) {
        Object.assign(output, { [key]: source[key] });
      } else {
        output[key] = deepMerge(target[key], source[key]);
      }
    } else {
      Object.assign(output, { [key]: source[key] });
    }
  });
  
  return output;
}