
import { resolveImageSrc } from '@/utils/imageSrc';

interface NavBarProps {
    logoUrl: string;
  logoMimeType?: string;
    title: string;
    children: React.ReactNode;
}

export const NavBar = ({ 
    logoUrl,
    logoMimeType,
    title,
    children
}: NavBarProps) => {
  const logoSrc = resolveImageSrc(logoUrl, logoMimeType);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Partie Gauche : Logo */}
      <div className="flex items-center flex-1">
        {logoSrc ? <img src={logoSrc} alt="Logo" className="h-10 w-auto" /> : null}
      </div>

      {/* Partie Centrale : Titre Modifiable */}
      <div className="flex-1 text-center">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>

      {/* Partie Droite : Boutons (Montant non prédéfini) */}
      <div className="flex items-center justify-end flex-1 gap-3">
        {children}
      </div>
    </nav>
  );
};