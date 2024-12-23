interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

interface SlugConvertProps {
  slug: string;
  type: string;
}

export type { ConfirmModalProps, SlugConvertProps };
