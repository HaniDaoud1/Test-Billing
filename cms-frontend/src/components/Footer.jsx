import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className={` bg-black text-gray-300 pt-10 pb-6 px-6`}>

      {/* Contenu principal */}
<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

  {/* Logo + description */}
  <div>
    <h2 className="text-white text-2xl font-bold mb-3">
      ALWESLATI
    </h2>
    <p className="text-sm text-gray-400">
      Your trusted partner in digital solutions.
Innovation, reliability, and tailored services — ALWESLATI empowers businesses with modern technology and sustainable growth.
    </p>
  </div>

  {/* Useful Links */}
  <div>
    <h3 className="text-white text-lg font-semibold mb-3">Useful Links</h3>
    <ul className="space-y-2">
      <li><a href="#" className="hover:text-white transition">Home</a></li>
      <li><a href="#" className="hover:text-white transition">Products</a></li>
      <li><a href="#" className="hover:text-white transition">Contact</a></li>
      <li><a href="#" className="hover:text-white transition">About Us</a></li>
    </ul>
  </div>

  {/* Contact */}
  <div>
    <h3 className="text-white text-lg font-semibold mb-3">Contact</h3>
    <ul className="space-y-2 text-sm">
      <li className="flex items-center gap-2">
        <Phone className="w-4 h-4 text-white" /> +213 123456789
      </li>
      <li className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-white" /> info@alweslati.com
      </li>
      <li className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-white" /> Slovinia
      </li>
    </ul>
  </div>

  {/* Social Media */}
  <div>
    <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
    <div className="flex gap-4">
      <a href="#" className="hover:text-white transition"><Facebook /></a>
      <a href="#" className="hover:text-white transition"><Instagram /></a>
    </div>
  </div>

</div>
<h2 className="text-white text-5xl md:text-7xl font-bold mx-auto text-center my-6">
     ALWESLATI
    </h2>
{/* Bottom line */}
<div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
  © {new Date().getFullYear()} ALWESLATI BY HANI DAOUD — All rights reserved.
</div>

    </footer>
  );
}

export default Footer;
