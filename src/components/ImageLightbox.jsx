import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function ImageLightbox({ src, alt, className, style, loading }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.scrollTo(0, scrollY);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        className="case-image-button"
        type="button"
        aria-label={`${alt} 확대 보기`}
        onClick={() => setIsOpen(true)}
      >
        <img src={src} alt={alt} className={className} style={style} loading={loading} />
      </button>

      {isOpen && createPortal(
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} 확대 이미지`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <button
            ref={closeRef}
            className="image-lightbox-close"
            type="button"
            aria-label="확대 이미지 닫기"
            onClick={() => setIsOpen(false)}
          >
            <X aria-hidden="true" size={26} />
          </button>
          <img className="image-lightbox-content" src={src} alt={alt} />
        </div>,
        document.body,
      )}
    </>
  );
}
