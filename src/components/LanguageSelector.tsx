import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-white/80" />
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white hover:bg-white/20 focus:bg-white/20">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span>{languages.find(l => l.code === language)?.flag}</span>
              <span className="text-sm">{languages.find(l => l.code === language)?.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="hover:bg-accent">
              <div className="flex items-center space-x-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;