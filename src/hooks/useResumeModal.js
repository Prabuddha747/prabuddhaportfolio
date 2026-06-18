import { useEffect, useState } from 'react';
import { resumeLinks } from '../data/socialLinks';

export function useResumeModal() {
  const [open, setOpen] = useState(false);
  const [frameSrc, setFrameSrc] = useState('');

  function openModal() {
    if (!frameSrc) setFrameSrc(resumeLinks.preview);
    setOpen(true);
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    setOpen(false);
    document.body.style.overflow = '';
  }

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape' && open) closeModal(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return { open, frameSrc, openModal, closeModal };
}
