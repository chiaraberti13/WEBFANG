import { useLayoutEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  titleId: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ titleId, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog
      ref={ref}
      className="wf-modal"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="wf-modal__card">{children}</div>
    </dialog>
  );
}
