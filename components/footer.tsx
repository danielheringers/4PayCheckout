import Link from "next/link";
import { Phone, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white/10 backdrop-filter backdrop-blur-lg border-t border-white/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Phone Number Section */}
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-600" />
            <span className="text-lg font-medium">Ligue: 4003-0588</span>
          </div>
          <p>
            © Copyright Tenda - Todos os direitos reservados CNPJ:
            09.625.762/0001-58
          </p>
          {/* Social Media Section */}
          <div className="flex items-center gap-6">
            <span className="text-lg font-medium">Nossas Redes</span>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/ConstrutoraTenda/"
                className="text-red-600 hover:text-red-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/construtoratenda/"
                className="text-red-600 hover:text-red-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/construtora-tenda/"
                className="text-red-600 hover:text-red-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.youtube.com/user/TendaConstrutora"
                className="text-red-600 hover:text-red-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-6 h-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
