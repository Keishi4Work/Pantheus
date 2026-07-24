"use client";

import * as React from "react";
import { Dialog as ModalPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Modal dialog (design-system v2), built on the same radix Dialog primitive as
 * Sheet. Centered panel, radius 10, `shadow-e3`. Compose:
 *   <Modal><ModalTrigger/><ModalContent><ModalHeader><ModalTitle/></ModalHeader>
 *   <ModalBody/><ModalFooter> ghost + primary Button </ModalFooter></ModalContent></Modal>
 */
function Modal(props: React.ComponentProps<typeof ModalPrimitive.Root>) {
  return <ModalPrimitive.Root data-slot="modal" {...props} />;
}

function ModalTrigger(
  props: React.ComponentProps<typeof ModalPrimitive.Trigger>,
) {
  return <ModalPrimitive.Trigger data-slot="modal-trigger" {...props} />;
}

function ModalClose(props: React.ComponentProps<typeof ModalPrimitive.Close>) {
  return <ModalPrimitive.Close data-slot="modal-close" {...props} />;
}

function ModalContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof ModalPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <ModalPrimitive.Portal>
      <ModalPrimitive.Overlay
        data-slot="modal-overlay"
        className="fixed inset-0 z-50 bg-black/20 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
      />
      <ModalPrimitive.Content
        data-slot="modal-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-0 rounded-[10px] border border-line bg-surface text-sm text-ink shadow-e3 duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <ModalPrimitive.Close asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-3 right-3"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </ModalPrimitive.Close>
        ) : null}
      </ModalPrimitive.Content>
    </ModalPrimitive.Portal>
  );
}

function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-header"
      className={cn("border-b border-line px-5 py-4", className)}
      {...props}
    />
  );
}

function ModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof ModalPrimitive.Title>) {
  return (
    <ModalPrimitive.Title
      data-slot="modal-title"
      className={cn(
        "text-[15px] font-bold tracking-[-0.01em] text-ink",
        className,
      )}
      {...props}
    />
  );
}

function ModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof ModalPrimitive.Description>) {
  return (
    <ModalPrimitive.Description
      data-slot="modal-description"
      className={cn("mt-1 text-[13px] text-ink-soft", className)}
      {...props}
    />
  );
}

function ModalBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-body"
      className={cn("px-5 py-4", className)}
      {...props}
    />
  );
}

function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "flex items-center justify-end gap-2 border-t border-line px-5 py-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
};
