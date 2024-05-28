import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-light tracking-tighter"
      aria-label="Cruip"
    >
      <Image
        src="/images/logo.png" 
        alt="Go Linguistic Logo" 
        width={70} 
        height={70} 
      />
      Go Linguistic!
    </Link>
  );
}