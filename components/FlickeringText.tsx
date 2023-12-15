'use client';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FlickeringText = ({ text }: { text: string }) => {
  const controls = useAnimation();
  const router = useRouter();

  return (
    <Link href='/'>
      <motion.div>
        {text.split('').map((char, index) => (
          <motion.span key={char + '-' + index}>{char}</motion.span>
        ))}
      </motion.div>
    </Link>
  );
};

export default FlickeringText;
